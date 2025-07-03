// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState <
    { type: "success" | "error" | null, message: string } >
    {
      type: null,
      message: "",
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    // Simulate success response
    setStatus({
      type: "success",
      message: "Reset link sent! Please check your email inbox.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-col items-center space-y-2 pb-2">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-2">
              <i className="fas fa-home text-indigo-600 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Interior Vendor
            </h2>
          </CardHeader>

          <CardContent className="px-8 pt-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Reset Your Password
              </h3>
              <p className="text-gray-600">
                Enter your email to receive password reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {status.type && (
                <Alert
                  className={`${
                    status.type === "success"
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  <AlertDescription>
                    {status.type === "success" ? (
                      <div className="flex items-center">
                        <i className="fas fa-check-circle mr-2 text-green-500"></i>
                        {status.message}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <i className="fas fa-exclamation-circle mr-2 text-red-500"></i>
                        {status.message}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Send Reset Link
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-8 px-8">
            <p className="text-sm text-gray-600">
              Remembered your password?{" "}
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
              >
                Back to Login
              </a>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Interior Vendor. All rights reserved.
          </p>
        </div>
      </div>

      <div className="hidden lg:block absolute right-0 top-0 h-full w-1/2">
        <div className="h-full w-full relative">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20interior%20design%20space%20with%20soft%20natural%20lighting%2C%20elegant%20furniture%20pieces%2C%20neutral%20color%20palette%20with%20subtle%20accent%20colors%2C%20minimalist%20design%20aesthetic%2C%20professional%20high-quality%20photography%2C%20clean%20lines%20and%20textures%2C%20warm%20inviting%20atmosphere&width=800&height=1024&seq=1&orientation=portrait"
            alt="Interior design showcase"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
