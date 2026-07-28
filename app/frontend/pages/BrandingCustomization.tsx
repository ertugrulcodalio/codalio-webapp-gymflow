import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useModelIndex, useModelCreate, useModelUpdate, useBaseOwnerId } from "@rhino-project/core/hooks";

export default function BrandingCustomization() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const organizationId = useBaseOwnerId();

  // Form states
  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#10b981");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch branding settings
  const { resources: brandingData, isPending, refetch } = useModelIndex("branding_setting");
  const brandingSettings = brandingData?.results ?? [];
  const currentBranding = brandingSettings[0]; // Since it's scoped to organization, there should be at most one

  useEffect(() => {
    if (currentBranding) {
      setLogoUrl(currentBranding.logo_url || "");
      setPrimaryColor(currentBranding.primary_color || "#10b981");
    }
  }, [currentBranding]);

  // Mutations
  const { mutateAsync: createBranding } = useModelCreate("branding_setting", {
    onSuccess: () => {
      setSuccess("Branding settings saved successfully!");
      refetch();
    }
  });

  const { mutateAsync: updateBranding } = useModelUpdate("branding_setting", {
    onSuccess: () => {
      setSuccess("Branding settings updated successfully!");
      refetch();
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!logoUrl) {
      setError("Logo URL is required.");
      return;
    }
    try {
      if (currentBranding) {
        await updateBranding({
          id: currentBranding.id,
          logo_url: logoUrl,
          primary_color: primaryColor
        });
      } else {
        await createBranding({
          logo_url: logoUrl,
          primary_color: primaryColor,
          organization_id: organizationId
        });
      }
    } catch (err: any) {
      setError(err?.response?.data?.errors?.[0] || err?.message || "Failed to save branding settings.");
    }
  };

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0 max-w-2xl">
        <section>
          <h1 className="text-3xl font-bold">Branding Customization</h1>
          <p className="text-muted-foreground text-sm">Customize the visual identity of your gym's member portal.</p>
        </section>

        {isPending ? (
          <div className="text-center py-8 text-muted-foreground">Loading branding settings...</div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>Upload a custom logo and select a primary brand color for your gym.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    type="url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Provide a direct URL to your gym's logo image (PNG/JPEG).</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Brand Color</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      placeholder="#10b981"
                      className="max-w-[150px]"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Select a primary color that will be used for buttons, links, and highlights.</p>
                </div>

                {/* Live Preview */}
                <div className="border border-border rounded-lg p-4 bg-muted/50 space-y-3">
                  <h4 className="text-sm font-semibold">Live Preview</h4>
                  <div className="flex items-center gap-4 p-3 bg-background rounded border border-border">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Gym Logo" className="h-8 object-contain" onError={(e) => { (e.target as any).style.display = 'none'; }} />
                    ) : (
                      <div className="h-8 w-8 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">Logo</div>
                    )}
                    <span className="font-bold">Apex Fitness</span>
                    <Button style={{ backgroundColor: primaryColor, color: '#fff' }} size="sm" className="ml-auto">
                      Book Class
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-emerald-500 text-emerald-600 bg-emerald-50">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end">
                  <Button type="submit">
                    Save Branding Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
