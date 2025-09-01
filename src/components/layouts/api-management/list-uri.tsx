"use client";
import React, { startTransition, useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Loader2, Plus, Trash } from "lucide-react";
import { generateId } from "better-auth";
import {
  createAuthroizeURIs,
  deleteAuthorizeURI,
} from "@/src/actions/api-key.action";

export default function ListUri({
  data,
}: {
  data: { id: string; url: string }[];
}) {
  const [inputState, setInputState] = useState<{ id: string; url: string }[]>(
    []
  );
  const [isPending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data) {
      setInputState(data);
    }
  }, [data]);

  const handleCrateUri = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setMessage("");

    startTransition(async () => {
      const res = await createAuthroizeURIs(inputState);

      if (!res.status && res.statusCode === 422) {
        setMessage(res.message);
      }
      setPending(false);
    });
  };

  const deleteUri = async (uri_id: string) => {
    if (!uri_id.startsWith("new-")) {
      startTransition(async () => {
        await deleteAuthorizeURI(uri_id);
      });
    }

    setInputState((prev) => prev.filter((data) => data.id !== uri_id));
  };

  return (
    <>
      <p className="pb-5 text-center italic text-red-500">
        {message}
      </p>
      <form onSubmit={handleCrateUri} className="grid grid-cols-2 gap-5">
        {inputState.map((item, index) => {
          return (
            <div className="flex items-center gap-2 w-full">
              <div className="w-full relative ">
                <input name={`unique-${item}`} type="text" hidden />
                <Input
                  value={inputState.find((data) => data.id === item.id)?.url}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setInputState((prev) =>
                      prev.map((p) =>
                        p.id === item.id ? { ...p, url: newValue } : p
                      )
                    );
                  }}
                  name={`input-${item.id}`}
                  id={`input-${item.id}`}
                  className="peer"
                  placeholder=" "
                />
                <Label
                  htmlFor={`input-${item.id}`}
                  className="absolute text-neutral-500 left-3 bg-white px-1 transition-all duration-150 top-1/2 -translate-y-[190%] scale-90 peer-focus:scale-90 peer-focus:-translate-y-[190%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100"
                >
                  URIs {index + 1} *
                </Label>
              </div>
              <Button
                type="button"
                onClick={() => deleteUri(item.id)}
                variant={"outline"}
                className="cursor-pointer"
              >
                <Trash size={20} />
              </Button>
            </div>
          );
        })}

        <Button
          type="button"
          onClick={() => {
            setInputState((prev) => [
              ...prev,
              { id: `new-${generateId(32)}`, url: "" },
            ]);
          }}
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
        >
          <Plus size={20} />
          Add URI
        </Button>
        <div className="w-full flex justify-center col-span-2">
          <Button type="submit" className="w-3xs mt-5 cursor-pointer">
            {isPending && <Loader2 className="animate-spin" />} Save
          </Button>
        </div>
      </form>
    </>
  );
}
