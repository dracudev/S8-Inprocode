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

const EventDialog = ({
  isModalOpen,
  setIsModalOpen,
  eventForm,
  setEventForm,
  handleSubmit,
  handleDelete,
  selectedEvent,
}) => {
  return (
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
  );
};

export default EventDialog;
