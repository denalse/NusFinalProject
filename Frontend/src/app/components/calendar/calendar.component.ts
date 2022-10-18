import { Component, OnInit } from '@angular/core';
import { startOfDay } from 'date-fns';
import { CalendarView, CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

})
export class CalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  //emoji
  // picker = new Picker();
  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ];
 set = <const> 'twitter';

  constructor() { }

  setView(view: CalendarView) {
    this.view = view;
  }

  ngOnInit(): void { }

  events: CalendarEvent[] = [
    {
      id: "event-1",
      start: startOfDay(new Date()),
      title: 'First event',
      draggable: true,
    },
    {
      id: "event-2",
      start: startOfDay(new Date()),
      title: 'Second event',
      draggable: true,
    }
  ]

  generateUid() {
    const uid = Math.random().toString(36).substr(2, 9);
    return `mdb-calendar-event-${uid}`;
  }

  onEventAdd(event: CalendarEvent) {
    event.id = this.generateUid();
    this.events = [...this.events, event];
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    console.log(events);
    //let x=this.adminService.dateFormat(date)
    //this.openAppointmentList(x)
  }

  // drag events
  refresh = new Subject<void>();

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  // edit events
  // onEventEdit({ date, events }: { date: Date; events: CalendarEvent[] }) {

  //   // const oldEvent = this.events.findIndex( old => old.id === event.id);
  //   // this.events[oldEvent] = event;
  //   // this.events = [...this.events];
  // }

  // delete events
  // eventDelete({ event }: { event: CalendarEvent }): void => {
  //   this.event = this.event.filter(e => e!== event);
    

  //   }

  //emoji
  
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    console.log(this.message)
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }


}
