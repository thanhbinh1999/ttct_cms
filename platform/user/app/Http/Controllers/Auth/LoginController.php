<?php

namespace Kuroneko\User\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Kuroneko\Core\Supports\Message\Mailer;
use Kuroneko\User\Repositories\UserRepository;


class LoginController extends Controller
{
    use AuthenticatesUsers;

    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    public function __construct(UserRepository $userRepository)
    {
        $this->middleware('guest')->except('logout');
        $this->userRepository = $userRepository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function showLoginForm()
    {
        /**
         *
         *
         * Login -> check exists in DB
         * -> Generate token with expire in 5 minute
         * -> Send token to Email or phone
         * ->
         *
         */
//        dd(Redis::set('giang', 'meo','EX',20));
        session()->forget('confirm_login');
        if (session()->has('confirm_login')) {
            return redirect()->route('user.show_confirm_login_form');
        }
        set_page_title('Đăng nhập trang quảng trị');
        return view('user::auth.login');
    }

    public function showConfirmLoginForm()
    {
        session()->forget('confirm_login');
        if (!session()->has('confirm_login')) {
            return redirect()->route('user.show_login_form')->withErrors([
                'username' => 'Có lỗi xảy ra, vui lòng thử lại'
            ]);
        }
        set_page_title('Đăng nhập trang quảng trị');
        return view('user::auth.confirm-login');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function processConfirmLogin(Request $request)
    {
        $this->validate($request, [
            'token' => 'required|string'
        ], [
            'required' => ':attribute không được để trống',
            'string' => ':attribute phải là dạng chuỗi'
        ]);

        if (session()->has('confirm_login')) {
            $user = $this->userRepository->findById(session()->get('confirm_login')['user_id']);
            if (empty($user->login_token) || empty($user->token_expire_at)) {
                return redirect()->route('user.show_login_form')->withErrors([
                    'username' => 'Có lỗi xảy ra, vui lòng thử lại'
                ]);
            }
            $expire = Carbon::parse($user->token_expire_at);
            if ($expire->lessThan(Carbon::now())) {
                session()->forget('confirm_login');
                return redirect()->route('user.show_login_form')->withErrors([
                    'username' => 'Token đã hết hạn, vụi lòng thử lại'
                ]);
            }

            if ($user->login_token != $request->get('token')) {
                return redirect()->back()->withErrors([
                    'token' => 'Token không đúng, vui lòng kiểm tra lại'
                ]);
            } else {
                session()->forget('confirm_login');
                $this->guard()->login($user);
                return redirect()->route('ttct.dashboard');
            }

        } else {
            return redirect()->route('user.show_login_form')->withErrors([
                'username' => 'Có lỗi xảy ra, vui lòng thử lại'
            ]);
        }
    }

    /**
     * The user has been authenticated.
     *
     * @param \Illuminate\Http\Request $request
     * @param mixed $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        $user->login_at = Carbon::now()->toDateTimeString();
        $user->save();
    }
//    /**
//     * Handle a login request to the application.
//     *
//     * @param \Illuminate\Http\Request $request
//     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Http\JsonResponse
//     *
//     * @throws \Illuminate\Validation\ValidationException
//     */
//    public function login(Request $request)
//    {
//        $this->validateLogin($request);
//
//        $credentials = $request->all();
//
//        $user = $this->userRepository->firstBy([
//            'WHERE' => [
//                [$this->username(), '=', $credentials[$this->username()]]
//            ]
//        ]);
//
//        if (\Hash::check($credentials['password'], $user->password)) {
//            $expire = Carbon::now()->addMinutes(5)->toDateTimeString();
//            $token = \Str::random('10');
//            $user->login_token = $token;
//            $user->token_expire_at = $expire;
//            $user->save();
//
//            $mailer = new Mailer();
//            $msg = '<div><p>Hello there!<p></div>
//                <div><p>This is login token for you:<p></div>
//                <div style=""><p><strong>' . \Str::random(10) . '</strong><p></div>
//                <div><p>Token will expire at ' . Carbon::parse($expire)->format('d/m/Y H:i') . '<p></div>
//                <br>
//                <div><p><strong>Putang ninamo bobo</strong><p></div>';
//
//            $mailer->sendSms($user->phone, $token);
////            $mailer->sendEmail($user->email, $msg);
// 
//            session(['confirm_login' => [
//                'user_id' => $user->id
//            ]]);
//
//            return redirect()->route('user.show_confirm_login_form');
//
//        } else {
//            return redirect()->back()->withErrors([
//                'username' => 'Tên đăng nhập hoặc mật khẩu không đúng'
//            ])->withInput($request->all());
//        }
//
//        // If the login attempt was unsuccessful we will increment the number of attempts
//        // to login and redirect the user back to the login form. Of course, when this
//        // user surpasses their maximum number of attempts they will get locked out.
////        $this->incrementLoginAttempts($request);
////
////        return $this->sendFailedLoginResponse($request);
//    }

    /**
     * Validate the user login request.
     *
     * @param \Illuminate\Http\Request $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateLogin(Request $request)
    {
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
        ], [
            'required' => ':attribute không được để trống',
            'string' => ':attribute phải là dạng chuỗi'
        ]);
    }

    /**
     * @return string
     */
    public function username()
    {
        return 'username';
    }

    /**
     * @return \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return \Auth::guard();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->regenerateToken();

        return $this->loggedOut($request) ?: redirect()->route('user.show_login_form');
    }
}
