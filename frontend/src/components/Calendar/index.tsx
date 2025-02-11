import { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useFetchEvent from "@/hooks/use-fetch-event";
import { Event } from "@/types/types";
import EventDialog from "./EventDialog";
import {
  handleCreate,
  handleUpdate,
  handleDelete,
} from "@/services/eventService";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
}

const Calendar = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const {
    data: events,
    loading,
    error,
  } = useFetchEvent("api/event", [refresh]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState<Partial<Event>>({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
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

  const updateRowData = (): void => {
    setRefresh((prev) => !prev);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setEventForm({
      title: "",
      description: "",
      start_date: selectInfo.startStr,
      end_date: selectInfo.endStr,
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
        start_date: event.start_date,
        end_date: event.end_date,
      });
      setIsModalOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvent) {
      await handleUpdate(
        {
          ...eventForm,
          id_event: selectedEvent.id_event,
        },
        updateRowData
      );
    } else {
      await handleCreate(eventForm, updateRowData);
    }
    setIsModalOpen(false);
  };

  const handleClickDelete = async () => {
    if (selectedEvent) {
      await handleDelete(selectedEvent.id_event.toString(), updateRowData);
      setIsModalOpen(false);
    }
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

      <EventDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        eventForm={eventForm}
        setEventForm={setEventForm}
        handleSubmit={handleSubmit}
        handleDelete={handleClickDelete}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

export default Calendar;
