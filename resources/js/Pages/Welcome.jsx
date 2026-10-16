import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Welcome() {
    const [showRegister, setShowRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [notice, setNotice] = useState('');

        const {
        data: login,
        setData: setLogin,
        post: postLogin,
        processing: loggingIn,
        errors: loginErrors,
    } = useForm({
        email: '',
        password: '',
    });
    
    const {
        data: register,
        setData: setRegister,
        post: postRegister,
        processing: registering,
        errors: registerErrors,
        reset: resetRegister,
    } = useForm({
        first_name: '',
        last_name: '',
        age: '',
        birth_date: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
    });


        const updateLogin = (event) => {
        setLogin(event.target.name, event.target.value);
    };

    const updateRegister = (event) => {
        setRegister(event.target.name, event.target.value);
    };

        const submitLogin = (event) => {
        event.preventDefault();

        setNotice('');

        postLogin('/login', {
            onError: () => {
                setNotice('Login failed. Please check your email and password.');
            },
        });
    };
    
    const submitRegister = (event) => {
        event.preventDefault();

        postRegister('/register', {
            onSuccess: () => {
                setShowRegister(false);
                resetRegister();
                setNotice('');
            },
            onError: () => {
                setNotice('Please check the highlighted fields and try again.');
            },
        });
    };

    return (
        <main className="candelite-page">
            <header className="site-header">
                <a className="brand" href="/" aria-label="Candelite home">
                    <span className="brand-mark">✧</span>
                    <span>
                        <strong>Candelite</strong>
                        <small>GLOW WITH THE FLOW</small>
                    </span>
                </a>

                <div className="header-note">
                    <span className="status-dot" />
                    A little warmth, just for you
                </div>
            </header>

            <section className="auth-layout">
                <aside className="auth-story">
                    <div className="story-image">
                        <div className="image-overlay" />
                        <div className="story-label">
                            <span>THE ART OF SLOW LIVING</span>
                            <h1>Make room<br />for a little<br /><em>more warmth.</em></h1>
                            <p>Thoughtful scents. Quiet moments.<br />A home that feels like you.</p>
                        </div>
                        <div className="image-caption">
                            <span>01 / YOUR MOMENT OF CALM</span>
                            <span>EST. WITH LOVE</span>
                        </div>
                    </div>

                    <div className="story-footer">
                        <span>Small rituals, softer days.</span>
                        <span>Made to make you feel at home.</span>
                    </div>
                </aside>

                <section className="login-side">
                    <div className="login-card">
                        <div className="welcome-icon">
                            <span>✧</span>
                        </div>

                        <p className="eyebrow">YOUR LITTLE CORNER OF CALM</p>
                        <h2>Welcome <em>back.</em></h2>
                        <p className="login-description">
                            Sign in and pick up where your comfort begins.
                        </p>

                        <form onSubmit={submitLogin} className="auth-form">
                            <label htmlFor="login-email">Email address</label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={login.email}
                                onChange={updateLogin}
                                required
                            />
                             {loginErrors.email && (
                                <p className="form-error">{loginErrors.email}</p>
                            )}

                            <div className="label-row">
                                <label htmlFor="login-password">Password</label>
                                <button
                                    type="button"
                                    className="text-button"
                                    onClick={() => setNotice('Password reset will be available when authentication is connected.')}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            {loginErrors.password && (
                                <p className="form-error">{loginErrors.password}</p>
                            )}

                            <div className="password-field">
                                <input
                                    id="login-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={login.password}
                                    onChange={updateLogin}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            <label className="remember-row">
                                <input type="checkbox" />
                                <span>Keep me signed in</span>
                            </label>

                            <button type="submit" className="primary-button">
                                SIGN IN <span>↗</span>
                            </button>
                        </form>

                        <div className="or-divider"><span>OR</span></div>

                        <p className="register-prompt">
                            New to Candelite?{' '}
                            <button
                                className="text-button register-link"
                                onClick={() => {
                                    setNotice('');
                                    setShowRegister(true);
                                }}
                            >
                                Create an account
                            </button>
                        </p>

                        <div className="login-bottom">
                            <span>✦</span> A softer kind of everyday luxury
                        </div>
                    </div>

                    <p className="legal-note">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </section>
            </section>

            {notice && (
                <div className="notice" role="status">
                    <span>✦</span> {notice}
                    <button onClick={() => setNotice('')} aria-label="Dismiss message">×</button>
                </div>
            )}

            {showRegister && (
                <div
                    className="modal-backdrop"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setShowRegister(false);
                    }}
                >
                    <section
                        className="register-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="register-title"
                    >
                        <button
                            className="modal-close"
                            onClick={() => setShowRegister(false)}
                            aria-label="Close registration"
                        >
                            ×
                        </button>

                        <p className="eyebrow">WELCOME TO OUR LITTLE WORLD</p>
                        <h2 id="register-title">Create your <em>account.</em></h2>
                        <p className="modal-description">A few details, then a little more comfort.</p>

                        <form onSubmit={submitRegister} className="register-form">
                            <div className="register-grid">
                                
                                <div className="field">
                                    <label htmlFor="first_name">First name</label>
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        value={register.first_name}
                                        onChange={updateRegister}
                                        autoComplete="given-name"
                                        required
                                        aria-invalid={!!registerErrors.first_name}
                                    />
                                    {registerErrors.first_name && (
                                        <small className="field-error">
                                            {registerErrors.first_name}
                                        </small>
                                    )}
                                </div>
 
                                <div className="field">
                                    <label htmlFor="last_name">Last name</label>
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        value={register.last_name}
                                        onChange={updateRegister}
                                        autoComplete="family-name"
                                        required
                                        aria-invalid={!!registerErrors.last_name}
                                    />
                                    {registerErrors.last_name && (
                                        <small className="field-error">
                                            {registerErrors.last_name}
                                        </small>
                                    )}
                                </div>

                                <div className="field">
                                    <label htmlFor="age">Age</label>
                                    <input
                                        id="age"
                                        name="age"
                                        type="number"
                                        min="18"
                                        max="120"
                                        value={register.age}
                                        onChange={updateRegister}
                                        required
                                        aria-invalid={!!registerErrors.age}
                                    />
                                    {registerErrors.age && (
                                        <small className="field-error">
                                            {registerErrors.age}
                                        </small>
                                    )}
                                </div>

                                <div className="field">
                                    <label htmlFor="birth_date">Birth date</label>
                                    <input
                                        id="birth_date"
                                        name="birth_date"
                                        type="date"
                                        value={register.birth_date}
                                        onChange={updateRegister}
                                        max={new Date().toISOString().split('T')[0]}
                                        required
                                        aria-invalid={!!registerErrors.birth_date}
                                    />
                                    {registerErrors.birth_date && (
                                        <small className="field-error">
                                            {registerErrors.birth_date}
                                        </small>
                                    )}
                                </div>
        
                                <div className="field full-field">
                                    <label htmlFor="address">Complete address</label>
                                    <input
                                        id="address"
                                        name="address"
                                        value={register.address}
                                        onChange={updateRegister}
                                        autoComplete="street-address"
                                        required
                                        aria-invalid={!!registerErrors.address}
                                    />
                                    {registerErrors.address && (
                                        <small className="field-error">
                                            {registerErrors.address}
                                        </small>
                                    )}
                                </div>

                                <div className="field full-field">
                                    <label htmlFor="phone">Phone number</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={register.phone}
                                        onChange={updateRegister}
                                        autoComplete="tel"
                                        required
                                        aria-invalid={!!registerErrors.phone}
                                    />
                                    {registerErrors.phone && (
                                        <small className="field-error">
                                            {registerErrors.phone}
                                        </small>
                                    )}
                                </div>
        
                                <div className="field full-field">
                                    <label htmlFor="register-email">Email address</label>
                                    <input
                                        id="register-email"
                                        name="email"
                                        type="email"
                                        value={register.email}
                                        onChange={updateRegister}
                                        autoComplete="email"
                                        required
                                        aria-invalid={!!registerErrors.email}
                                    />
                                    {registerErrors.email && (
                                        <small className="field-error">
                                            {registerErrors.email}
                                        </small>
                                    )}
                                </div>
                               
                                <div className="field">
                                    <label htmlFor="register-password">Password</label>
                                    <input
                                        id="register-password"
                                        name="password"
                                        type="password"
                                        minLength="8"
                                        value={register.password}
                                        onChange={updateRegister}
                                        autoComplete="new-password"
                                        required
                                        aria-invalid={!!registerErrors.password}
                                    />
                                    {registerErrors.password && (
                                        <small className="field-error">
                                            {registerErrors.password}
                                        </small>
                                    )}
                                </div>
           
                                <div className="field">
                                    <label htmlFor="password_confirmation">Confirm password</label>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        minLength="8"
                                        value={register.password_confirmation}
                                        onChange={updateRegister}
                                        autoComplete="new-password"
                                        required
                                        aria-invalid={!!registerErrors.password}
                                    />
                                    {registerErrors.password && (
                                        <small className="field-error">
                                            {registerErrors.password}
                                        </small>
                                    )}
                                </div>

                            </div>

                            <p className="form-hint">Your information is used to create and protect your account.</p>
                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={registering}
                                >
                                    {registering ? 'CREATING ACCOUNT...' : 'CREATE MY ACCOUNT'}
                                    {!registering && <span>↗</span>}
                                </button>

                        </form>

                        <p className="modal-login">
                            Already have an account?{' '}
                            <button className="text-button" onClick={() => setShowRegister(false)}>Sign in</button>
                        </p>
                    </section>
                </div>
            )}
        </main>
    );
}
