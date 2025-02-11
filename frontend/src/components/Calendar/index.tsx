import React, { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetchEvent from "@/hooks/use-fetch-event";
import { Event } from "@/types/types";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
}

interface EventForm {
  title: string;
  start: string;
  end: string;
  description: string;
}

const Calendar = () => {
  const { data: events, loading, error } = useFetchEvent("api/event");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState<EventForm>({
    title: "",
    description: "",
    start: "",
    end: "",
  });

  const calendarEvents = useMemo(() => {
    return events.map(
      (event: Event): CalendarEvent => ({
        id: event.id_event.toString(),
        title: event.title,
        start: event.start_date,
        end: event.end_date,
        description: event.description,
      })
    );
  }, [events]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setEventForm({
      title: "",
      description: "",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(
      (e) => e.id_event.toString() === clickInfo.event.id
    );
    if (event) {
      setSelectedEvent(event);
      setEventForm({
        title: event.title,
        description: event.description || "",
        start: event.start_date,
        end: event.end_date,
      });
      setIsModalOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    // TODO
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        Loading calendar...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading calendar: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-[#1a1a1a] text-white">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={calendarEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="80vh"
          themeSystem="standard"
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? "Edit Event" : "Create Event"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm({ ...eventForm, title: e.target.value })
                }
                className="bg-gray-700 border-gray-600"
                required
              />
            </div>

            <div>
              <Label htmlFor="start">Start Date</Label>
              <Input
                id="start"
                type="datetime-local"
                value={eventForm.start}
                onChange={(e) =>
                  setEventForm({ ...eventForm, start: e.target.value })
                }
                className="bg-gray-700 border-gray-600"
                required
              />
            </div>

            <div>
              <Label htmlFor="end">End Date</Label>
              <Input
                id="end"
                type="datetime-local"
                value={eventForm.end}
                onChange={(e) =>
                  setEventForm({ ...eventForm, end: e.target.value })
                }
                className="bg-gray-700 border-gray-600"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({ ...eventForm, description: e.target.value })
                }
                className="bg-gray-700 border-gray-600"
              />
            </div>

            <DialogFooter className="space-x-2">
              {selectedEvent && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
              <Button type="submit" variant="default">
                {selectedEvent ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
