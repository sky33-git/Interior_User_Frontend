// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=elegant%20interior%20design%20background%20with%20soft%20neutral%20tones%2C%20minimalist%20aesthetic%2C%20light%20beige%20and%20white%20color%20palette%2C%20subtle%20texture%2C%20professional%20and%20modern%20look%2C%20perfect%20for%20a%20vendor%20registration%20page%20background&width=1920&height=1080&seq=1&orientation=landscape')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Join as a Vendor
            </CardTitle>
            <CardDescription>
              Create your vendor account to get started with our interior design
              platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-11 border-gray-300 !rounded-button cursor-pointer whitespace-nowrap"
              >
                <i className="fab fa-google text-lg"></i>
                <span>Register with Google</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-11 border-gray-300 !rounded-button cursor-pointer whitespace-nowrap"
              >
                <i className="fab fa-apple text-lg"></i>
                <span>Continue with Apple</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  or continue with email
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  className="h-11 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-11 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="h-11 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  className="h-11 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select>
                  <SelectTrigger
                    id="businessType"
                    className="h-11 border-gray-300 !rounded-button cursor-pointer whitespace-nowrap"
                  >
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interior-designer">
                      Interior Designer
                    </SelectItem>
                    <SelectItem value="furniture-vendor">
                      Furniture Vendor
                    </SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="architect">Architect</SelectItem>
                    <SelectItem value="decorator">Decorator</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="h-11 border-gray-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="h-11 border-gray-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <i
                      className={`fa ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button cursor-pointer whitespace-nowrap">
              Create Account
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
