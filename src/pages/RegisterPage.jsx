import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    setLoading(true)
    
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        company: data.company,
        role: data.role
      })
      
      if (result.success) {
        navigate('/onboarding')
      } else {
        setError('root', { message: result.error })
      }
    } catch (error) {
      setError('root', { message: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    'Predict viral trends before competitors',
    'Generate authentic thought leadership',
    'Build genuine industry authority',
    'Complete cost transparency with BYOK'
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Back to home */}
          <Link 
            to="/" 
            className="flex items-center text-authority-blue hover:text-authority-blue/80 transition-colors mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to home
          </Link>
          
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-authority-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="text-2xl font-bold text-authority-blue">AuthorityAI</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900">
            Start building authority
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-authority-blue hover:text-authority-blue/80"
            >
              Sign in here
            </Link>
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  {...register('name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  type="text"
                  autoComplete="name"
                  className="input-field"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  autoComplete="email"
                  className="input-field"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <div className="mt-1">
                <input
                  {...register('company', {
                    required: 'Company is required'
                  })}
                  type="text"
                  autoComplete="organization"
                  className="input-field"
                  placeholder="Enter your company"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-error">{errors.company.message}</p>
                )}
              </div>
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="mt-1">
                <select
                  {...register('role', {
                    required: 'Role is required'
                  })}
                  className="input-field"
                >
                  <option value="">Select your role</option>
                  <option value="ceo">CEO/Founder</option>
                  <option value="executive">Executive/VP</option>
                  <option value="director">Director</option>
                  <option value="manager">Manager</option>
                  <option value="consultant">Consultant</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="other">Other</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-error">{errors.role.message}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain uppercase, lowercase, and number'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="input-field pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="input-field pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                {...register('terms', {
                  required: 'You must accept the terms and conditions'
                })}
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-authority-blue focus:ring-authority-blue border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="text-authority-blue hover:text-authority-blue/80">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-authority-blue hover:text-authority-blue/80">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-error">{errors.terms.message}</p>
            )}

            {/* Error message */}
            {errors.root && (
              <div className="bg-error bg-opacity-10 border border-error border-opacity-20 rounded-lg p-3">
                <p className="text-sm text-error">{errors.root.message}</p>
              </div>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex justify-center items-center"
              >
                {loading ? (
                  <LoadingSpinner size="small" color="white" />
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Benefits */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-authority-blue to-authority-blue/80 flex items-center justify-center">
          <div className="max-w-md text-white p-8">
            <h3 className="text-2xl font-bold mb-6">
              Join Industry Leaders Building Authority
            </h3>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-authority-gold mr-3 flex-shrink-0" size={20} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg">
              <p className="text-sm">
                "AuthorityAI transformed how I approach thought leadership. 
                The dynamic interviews challenge my thinking and help me 
                create content that truly establishes my expertise."
              </p>
              <p className="text-xs mt-2 text-authority-gold">
                — Sarah Chen, VP of Strategy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

