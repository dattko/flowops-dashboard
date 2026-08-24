"use client"

import { MessageSquareText } from "lucide-react"

import type { OrderConsultationNote as OrderConsultationNoteData } from "@/entities/order"
import { formatDateTime } from "@/shared/lib/dayjs"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Label } from "@/shared/ui/label"
import { Typography } from "@/shared/ui/typography"

import { useOrderConsultationNote } from "../lib/use-order-consultation-note"

type OrderConsultationNoteProps = {
  orderId: string
  initialNotes: OrderConsultationNoteData[]
}

export const OrderConsultationNote = ({
  orderId,
  initialNotes,
}: OrderConsultationNoteProps) => {
  const {
    notes,
    form,
    submit,
    isAdding,
    successMessage,
    errorMessage,
  } = useOrderConsultationNote(orderId, initialNotes)

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <MessageSquareText
            className="size-4 text-primary"
            aria-hidden="true"
          />
          <CardTitle>상담 메모</CardTitle>
        </div>
        <CardDescription>고객 상담 내용을 이력으로 남깁니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <Label htmlFor="consultation-note">메모 내용</Label>
          <textarea
            id="consultation-note"
            rows={4}
            maxLength={2000}
            placeholder="상담 내용을 입력해 주세요."
            className="mt-2 w-full resize-y rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            {...form.register("content", { required: true })}
          />
          {errorMessage ? (
            <Typography
              variant="caption"
              tone="destructive"
              className="mt-2"
              role="alert"
            >
              {errorMessage}
            </Typography>
          ) : successMessage ? (
            <Typography
              variant="caption"
              tone="success"
              className="mt-2"
              role="status"
            >
              {successMessage}
            </Typography>
          ) : null}
          <Button
            type="submit"
            variant="outline"
            className="mt-3 w-full"
            disabled={isAdding}
          >
            {isAdding ? "등록 중..." : "상담 메모 등록"}
          </Button>
        </form>

        <div className="mt-5 space-y-3 border-t pt-5">
          {notes.length > 0 ? (
            notes.map((note) => (
              <article key={note.id} className="rounded-lg bg-muted/55 p-3">
                <Typography
                  variant="bodySmall"
                  className="whitespace-pre-wrap"
                >
                  {note.content}
                </Typography>
                <Typography variant="caption" tone="muted" className="mt-2">
                  {note.authorName ?? "관리자"} · {formatDateTime(note.createdAt)}
                </Typography>
              </article>
            ))
          ) : (
            <Typography variant="bodySmall" tone="muted">
              등록된 상담 메모가 없습니다.
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
