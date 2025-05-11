"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import Radio from "../form/input/Radio";
import { ISignUpUser } from "@/type/ISignUp";
import { signUp } from "@/services/auth.service";
import toast from "react-hot-toast";
import Button from "../ui/button/Button";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("Student");
  const [formData, setFormData] = useState<ISignUpUser>({
    name: "",
    email: "",
    password: "",
    userType: "Student",
  });

  const [errors, setErrors] = useState<Partial<ISignUpUser>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    setFormData(prev => ({ ...prev, userType: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ISignUpUser> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (!formData.userType.trim()) newErrors.userType = "User type is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('this is test');
    if (!validateForm()) return;

    try {
      console.log("formData=", formData);
      await signUp(formData);
      toast.success("Signup successful!");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup failed.");
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <Label>
                  Full Name<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  hint={errors.name}
                />
              </div>

              {/* User Type (Radio) */}
              <div>
                <Label>
                  Type<span className="text-error-500">*</span>
                </Label>
                <div className="flex flex-wrap items-center gap-8">
                  <Radio
                    id="radio1"
                    name="group1"
                    value="Student"
                    checked={selectedValue === "Student"}
                    onChange={handleRadioChange}
                    label="Student"
                  />
                  <Radio
                    id="radio2"
                    name="group1"
                    value="Alumni"
                    checked={selectedValue === "Alumni"}
                    onChange={handleRadioChange}
                    label="Alumni"
                  />
                </div>
                {errors.userType && (
                  <p className="mt-1.5 text-xs text-error-500">{errors.userType}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  hint={errors.email}
                />
              </div>

              {/* Password */}
              <div>
                <Label>
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    hint={errors.password}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <Button className="w-full" size="sm" type="submit">
                  Sign Up
                </Button>
              </div>
            </div>
          </form>

          {/* Link to Sign In */}
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?
              <Link
                href="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                {" "}Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
