"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Accessibility,
  Upload,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Download,
  MapPin,
} from "lucide-react"
import { mockUser } from "@/lib/mock-data"
import { formatCurrency, formatEATTime } from "@/lib/format"

export function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState({
    sessionReminders: true,
    newMessages: true,
    weeklyDigest: false,
    promotions: false,
  })
  const [smsNotifications, setSmsNotifications] = useState({
    sessionReminders: true,
    urgentMessages: true,
  })
  const [textSize, setTextSize] = useState("medium")
  const [reducedMotion, setReducedMotion] = useState(false)

  const loginActivity = [
    { device: "Chrome on Windows", location: "Addis Ababa", time: new Date(Date.now() - 1000 * 60 * 5), current: true },
    { device: "Safari on iPhone", location: "Addis Ababa", time: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { device: "Firefox on MacOS", location: "Bahir Dar", time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
    { device: "Chrome on Android", location: "Hawassa", time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
    { device: "Edge on Windows", location: "Dire Dawa", time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
  ]

  const billingHistory = [
    { id: "INV-001", date: "2024-01-15", amount: 4560, status: "Paid", method: "Telebirr" },
    { id: "INV-002", date: "2024-01-08", amount: 4560, status: "Paid", method: "CBE Birr" },
    { id: "INV-003", date: "2024-01-01", amount: 6840, status: "Paid", method: "Telebirr" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-2">
          <TabsTrigger value="account" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="gap-2">
            <Accessibility className="h-4 w-4" />
            <span className="hidden sm:inline">Accessibility</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile photo</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  Upload New Photo
                </Button>
                <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Kidist" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Alemayehu" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={mockUser.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+251 91 234 5678" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input id="currentPassword" type={showPassword ? "text" : "password"} />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input id="newPassword" type={showNewPassword ? "text" : "password"} />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy & Security */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">SMS Authentication</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive a code via SMS when you sign in</p>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Activity</CardTitle>
              <CardDescription>Recent devices that have accessed your account (EAT timezone)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loginActivity.map((activity, index) => (
                  <div key={index} className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{activity.device}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{activity.location}</span>
                          <span>•</span>
                          <span>{formatEATTime(activity.time)}</span>
                        </div>
                      </div>
                    </div>
                    {activity.current && <Badge variant="secondary">Current</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Request Data Export
              </Button>
              <p className="text-xs text-muted-foreground">
                Request a copy of your personal data. We&apos;ll send you an email when it&apos;s ready.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Preferences */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose which emails you&apos;d like to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Session Reminders</p>
                  <p className="text-xs text-muted-foreground">Get reminded about upcoming sessions</p>
                </div>
                <Switch
                  checked={emailNotifications.sessionReminders}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, sessionReminders: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">New Messages</p>
                  <p className="text-xs text-muted-foreground">Receive email when you get a new message</p>
                </div>
                <Switch
                  checked={emailNotifications.newMessages}
                  onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, newMessages: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Weekly Digest</p>
                  <p className="text-xs text-muted-foreground">Summary of your weekly progress and resources</p>
                </div>
                <Switch
                  checked={emailNotifications.weeklyDigest}
                  onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, weeklyDigest: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Promotions & Updates</p>
                  <p className="text-xs text-muted-foreground">New features and special offers</p>
                </div>
                <Switch
                  checked={emailNotifications.promotions}
                  onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, promotions: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>Receive important updates via SMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Session Reminders</p>
                  <p className="text-xs text-muted-foreground">SMS reminder 1 hour before sessions</p>
                </div>
                <Switch
                  checked={smsNotifications.sessionReminders}
                  onCheckedChange={(checked) => setSmsNotifications({ ...smsNotifications, sessionReminders: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Urgent Messages</p>
                  <p className="text-xs text-muted-foreground">SMS for time-sensitive communications</p>
                </div>
                <Switch
                  checked={smsNotifications.urgentMessages}
                  onCheckedChange={(checked) => setSmsNotifications({ ...smsNotifications, urgentMessages: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing & Payments */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">T</span>
                  </div>
                  <div>
                    <p className="font-medium">Telebirr</p>
                    <p className="text-sm text-muted-foreground">+251 91 *** **78</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">C</span>
                  </div>
                  <div>
                    <p className="font-medium">CBE Birr</p>
                    <p className="text-sm text-muted-foreground">+251 91 *** **78</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
              <Button variant="outline">Add Payment Method</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{invoice.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.date} • {invoice.method}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{formatCurrency(invoice.amount)}</span>
                      <Badge variant="secondary">{invoice.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accessibility */}
        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize your viewing experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Text Size</Label>
                <div className="flex gap-2">
                  {["small", "medium", "large"].map((size) => (
                    <Button
                      key={size}
                      variant={textSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTextSize(size)}
                      className="capitalize"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Reduced Motion</p>
                  <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Switch between light and dark mode</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Use the theme toggle in the header to switch between light and dark mode.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
