"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ConfigOverlayT } from "./alert-overlay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import { useOverlay } from "@/src/utils/context/overlay-provider";

export default function EditAlert({ children }: { children: React.ReactNode }) {
  const { setConfig, config } = useOverlay();
  const handleChange = (key: string, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Tampilan Overlay</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 grid-cols-1 gap-4 p-5">
        <div className="grid gap-2">
          <Label>Warna Background</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={config?.bgColor}
              onChange={(e) => handleChange("bgColor", e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={config?.bgColor}
              onChange={(e) => handleChange("bgColor", e.target.value)}
              placeholder="#1e293b"
              className="flex-1"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Warna Highlight</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={config?.highlightColor}
              onChange={(e) => handleChange("highlightColor", e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={config?.highlightColor}
              onChange={(e) => handleChange("highlightColor", e.target.value)}
              placeholder="#f97316"
              className="flex-1"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Warna Teks</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={config?.textColor}
              onChange={(e) => handleChange("textColor", e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={config?.textColor}
              onChange={(e) => handleChange("textColor", e.target.value)}
              placeholder="#f1f5f9"
              className="flex-1"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Template Teks</Label>
          <Input
            value={config?.templateText}
            onChange={(e) => handleChange("templateText", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>Durasi Notifikasi (ms)</Label>
          <Input
            type="number"
            value={config?.duration}
            onChange={(e) => handleChange("duration", parseInt(e.target.value))}
          />
        </div>

        <div className="grid gap-2">
          <Label>Font Weight</Label>
          <Input
            type="number"
            min={100}
            max={900}
            step={100}
            value={config?.fontWeight}
            onChange={(e) => handleChange("fontWeight", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>Font Size</Label>
          <Input
            type="text"
            className="border p-2 w-full"
            placeholder="contoh: 16px / 1.2rem / 120%"
            value={config?.fontSize}
            onChange={(e) => handleChange("fontSize", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>Font</Label>
          <Select
            onValueChange={(val) => handleChange("fontFamily", val)}
            defaultValue={config?.fontFamily}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="monospace">Monospace</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Shadow */}
        <div className="flex flex-col gap-2">
          <Label>Shadow</Label>
          <div className="flex gap-2 items-center">
            <Select
              onValueChange={(val) => handleChange("shadow", val)}
              defaultValue={config?.shadow}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih shadow" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="0 1px 2px rgba(0,0,0,0.1)">Small</SelectItem>
                <SelectItem value="0 4px 6px rgba(0,0,0,0.1)">
                  Medium
                </SelectItem>
                <SelectItem value="0 10px 15px rgba(0,0,0,0.2)">
                  Large
                </SelectItem>
                <SelectItem value="0 20px 25px rgba(0,0,0,0.25)">
                  Extra Large
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Custom Shadow Input */}
            <Input
              type="text"
              placeholder="contoh: 5px 5px 10px rgba(0,0,0,0.5)"
              value={config?.shadow}
              onChange={(e) => handleChange("shadow", e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <Switch
            checked={config?.borderless}
            onCheckedChange={(val) => handleChange("borderless", val)}
          />
          <Label>Tanpa Border</Label>
        </div>

        <div className="md:col-span-2">{children}</div>
      </CardContent>
    </Card>
  );
}
