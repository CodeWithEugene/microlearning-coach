"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Star, Crown, Infinity, BookOpen, Shield, Headphones, Globe } from "lucide-react"

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      originalPrice: null,
      icon: BookOpen,
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-100 dark:bg-gray-800",
      popular: false,
      features: [
        "Access to 50+ introductory modules",
        "Basic progress tracking",
        "Limited daily review sessions",
        "Community forum access",
        "Mobile app access",
        "Basic achievements system",
      ],
      limitations: [
        "Limited to 3 courses simultaneously",
        "Ads between lessons",
        "No offline downloads",
        "Basic customer support",
      ],
    },
    {
      name: "Premium Monthly",
      description: "Full access with monthly flexibility",
      price: { monthly: 499, annual: 499 },
      originalPrice: null,
      icon: Star,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      popular: false,
      features: [
        "Unlimited access to all premium content",
        "Advanced progress tracking & analytics",
        "Personalized learning paths",
        "AI-powered recommendations",
        "Ad-free experience",
        "Offline downloads",
        "Priority customer support",
        "Advanced gamification features",
        "Certificates of completion",
        "Access to live Q&A sessions",
      ],
      limitations: [],
    },
    {
      name: "Premium Annual",
      description: "Best value for committed learners",
      price: { monthly: 416, annual: 4999 },
      originalPrice: { monthly: 499, annual: 5988 },
      savings: 989,
      icon: Crown,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      popular: true,
      features: [
        "Everything in Premium Monthly",
        "Save KSh 989 annually",
        "One free personalized coaching session",
        "Early access to new courses",
        "Exclusive annual subscriber community",
        "Priority feature requests",
        "Advanced learning analytics dashboard",
        "Export learning certificates",
        "Bulk course downloads",
        "Premium support (24/7)",
      ],
      limitations: [],
    },
    {
      name: "Lifetime Access",
      description: "One-time payment, lifetime learning",
      price: { monthly: null, annual: 14999 },
      originalPrice: null,
      icon: Infinity,
      color: "text-gold-600 dark:text-yellow-400",
      bgColor: "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30",
      popular: false,
      limitedTime: true,
      features: [
        "Everything in Premium Annual",
        "Lifetime access to all current & future content",
        "Exclusive lifetime community access",
        "Annual 1-on-1 coaching sessions",
        "Beta access to new features",
        "Lifetime price lock guarantee",
        "VIP customer support",
        "Exclusive lifetime member badge",
        "Access to premium workshops",
        "Referral rewards program",
      ],
      limitations: [],
    },
  ]

  const formatPrice = (price) => {
    if (price === 0) return "Free"
    if (price === null) return ""
    return `KSh ${price.toLocaleString()}`
  }

  const getDisplayPrice = (plan) => {
    if (plan.name === "Lifetime Access") {
      return formatPrice(plan.price.annual)
    }
    return isAnnual ? formatPrice(plan.price.annual) : formatPrice(plan.price.monthly)
  }

  const getPeriod = (plan) => {
    if (plan.name === "Free") return ""
    if (plan.name === "Lifetime Access") return "one-time"
    return isAnnual ? "/year" : "/month"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Learning Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Unlock your potential with our flexible pricing options. Start free and upgrade anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm font-medium ${!isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-blue-600" />
            <span
              className={`text-sm font-medium ${isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              Annual
            </span>
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Save 20%</Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-200 hover:shadow-xl ${
                plan.popular ? "ring-2 ring-blue-600 dark:ring-blue-400 scale-105" : ""
              } ${plan.name === "Lifetime Access" ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}

              {plan.limitedTime && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                    Limited Time
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className={`w-6 h-6 ${plan.color}`} />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>

                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{getDisplayPrice(plan)}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{getPeriod(plan)}</span>
                  </div>

                  {plan.originalPrice && isAnnual && (
                    <div className="mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {formatPrice(plan.originalPrice.annual)}
                      </span>
                      <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                        Save KSh {plan.savings}
                      </Badge>
                    </div>
                  )}

                  {plan.name === "Premium Monthly" && isAnnual && (
                    <div className="mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Billed annually</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <Button
                  className={`w-full mb-6 ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : plan.name === "Free"
                        ? "bg-gray-600 hover:bg-gray-700 text-white"
                        : ""
                  }`}
                  variant={plan.popular ? "default" : plan.name === "Free" ? "default" : "outline"}
                >
                  {plan.name === "Free"
                    ? "Get Started Free"
                    : plan.name === "Lifetime Access"
                      ? "Get Lifetime Access"
                      : "Start Premium"}
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2">Limitations:</h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="text-xs text-gray-500 dark:text-gray-400">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Compare All Features</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Features</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Free</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Premium</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Lifetime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { feature: "Access to courses", free: "50+ courses", premium: "Unlimited", lifetime: "Unlimited" },
                  { feature: "Offline downloads", free: false, premium: true, lifetime: true },
                  { feature: "Ad-free experience", free: false, premium: true, lifetime: true },
                  { feature: "Progress analytics", free: "Basic", premium: "Advanced", lifetime: "Advanced" },
                  { feature: "AI recommendations", free: false, premium: true, lifetime: true },
                  { feature: "Certificates", free: false, premium: true, lifetime: true },
                  { feature: "Priority support", free: false, premium: true, lifetime: "VIP" },
                  { feature: "Coaching sessions", free: false, premium: "1/year", lifetime: "Annual" },
                  { feature: "Beta features", free: false, premium: false, lifetime: true },
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{row.free}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.premium === "boolean" ? (
                        row.premium ? (
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{row.premium}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.lifetime === "boolean" ? (
                        row.lifetime ? (
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{row.lifetime}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I switch plans anytime?",
                answer:
                  "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept M-Pesa, major credit/debit cards (Visa, Mastercard), and bank transfers for Kenyan customers.",
              },
              {
                question: "Is there a money-back guarantee?",
                answer:
                  "Yes, we offer a 30-day money-back guarantee for all premium plans. If you're not satisfied, we'll refund your payment.",
              },
              {
                question: "Can I use my account on multiple devices?",
                answer:
                  "Your account works on all devices - mobile, tablet, and web. Your progress syncs automatically across all platforms.",
              },
              {
                question: "What happens to my progress if I downgrade?",
                answer:
                  "Your learning progress is always saved. If you downgrade, you'll retain access to completed courses but may lose access to premium features.",
              },
              {
                question: "Are there any hidden fees?",
                answer:
                  "No hidden fees! The price you see is exactly what you pay. All taxes and fees are included in the displayed price.",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Headphones className="w-5 h-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Available Worldwide</span>
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Join over 10,000+ learners who trust Microlearning Coach for their skill development
          </p>
        </div>
      </div>
    </div>
  )
}
