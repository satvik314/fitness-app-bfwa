"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

export function PostureAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis("");
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePosture = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      // Remove the data URL prefix to get just the base64 data
      const base64Image = selectedImage.split(',')[1];
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          imageUrl: selectedImage // Send the full data URL
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const data = await response.json();
      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        throw new Error(data.error || 'Failed to analyze image');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-12 w-12 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or GIF (MAX. 5MB)
                </p>
              </div>
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {selectedImage && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="Selected posture"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}

          <Button
            onClick={analyzePosture}
            disabled={!selectedImage || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Posture"
            )}
          </Button>
        </div>
      </Card>

      {analysis && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-foreground whitespace-pre-line">{analysis}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
