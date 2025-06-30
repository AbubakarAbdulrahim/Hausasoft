import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus, CheckCircle, XCircle } from "lucide-react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import Modal from "../../components/common/Modal";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "instructor">("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);

  const passwordRules = [
    { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
    {
      label: "At least one number (0–9)",
      test: (pw: string) => /[0-9]/.test(pw),
    },
    {
      label: "At least one uppercase letter (A–Z)",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "At least one lowercase letter (a–z)",
      test: (pw: string) => /[a-z]/.test(pw),
    },
    {
      label: "At least one special character (!@#$%^&*)",
      test: (pw: string) => /[!@#$%^&*]/.test(pw),
    },
  ];

  const allPasswordRulesPassed = passwordRules.every((rule) =>
    rule.test(password)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setShowModal(false);

    if (!name.trim()) {
      setError("Please enter your name.");
      setShowModal(true);
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      setShowModal(true);
      return;
    }

    if (!allPasswordRulesPassed) {
      setError("Password must meet all the required criteria.");
      setShowModal(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const result = await register(
        name.trim(),
        email.trim(),
        password,
        confirmPassword,
        role
      );
      if (result.success) {
        setSuccess(
          result.message || "Registration successful. You can now log in."
        );
        setShowModal(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(result.message || "Registration failed.");
        setShowModal(true);
      }
    } catch (err: any) {
      const fallback =
        err?.response?.data?.message ||
        err?.message ||
        "An unexpected error occurred. Please try again later.";
      setError(fallback);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal && (error || success)) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal, error, success]);

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-16rem)] items-center justify-center p-4 animate-fade-in">
      <Card className="mx-auto w-full max-w-md border border-gray-200">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <UserPlus className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          {t("auth.register.title")}
        </h1>

        <Modal
          open={!!error || !!success ? showModal : false}
          onClose={() => {
            setShowModal(false);
            setError("");
            setSuccess("");
          }}
          type={success ? "success" : "error"}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            {success ? (
              <>
                <div className="text-green-700 text-base font-semibold mb-2">
                  {success}
                </div>
                <div className="text-sm text-gray-600">
                  Redirecting to login page...
                </div>
                <div className="mt-2">
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></span>
                </div>
              </>
            ) : (
              <div className="text-red-700 text-base font-medium">{error}</div>
            )}
          </div>
        </Modal>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {t("auth.name")}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                type="text"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {t("auth.email")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {t("auth.password")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Password Rules */}
          <div className="mt-2 space-y-1 mb-4">
            {passwordRules.map((rule, idx) => {
              const passed = rule.test(password);
              return (
                <div key={idx} className="flex items-center text-sm">
                  {passed ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={passed ? "text-green-700" : "text-red-600"}>
                    {rule.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t("auth.role")}
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  checked={role === "instructor"}
                  onChange={() => setRole("instructor")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Instructor</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <Button
            variant="green"
            className="w-full"
            type="submit"
            isLoading={loading}
          >
            {t("auth.register.button")}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">{t("auth.register.hasAccount")}</span>
          <Link
            to="/login"
            className="ml-1 font-medium text-primary-600 hover:text-primary-500"
          >
            {t("auth.login.button")}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
