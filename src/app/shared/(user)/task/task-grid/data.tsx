import { Column, Task } from "./types";

export const defaultCols: Column[] = [
  {
    _id: "pending",
    title: "Pending",
  },
  {
    _id: "in_progress",
    title: "In progress",
  },
  {
    _id: "overdue",
    title: "Overdue",
  },
  {
    _id: "completed",
    title: "Completed",
  },
];

// export const defaultTasks: Task[] = [
//   {
//     id: "1",
//     columnId: "pending",
//     content: "List admin APIs for dashboard",
//     name: "Task 1 List admin APIs for dashboard",
//     date: "1 Dec, 23- 6:00PM ",
//     status: "Pending",
//     client: "Aston Martin",
//     assigned_by: "John Doe",
//     assigned_to: "Mark Clerk",
//   },
//   {
//     id: "2",
//     columnId: "pending",
//     content:
//       "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
//     name: "Task 2",
//     date: "2 Dec, 23- 7:00PM ",
//     status: "Pending",
//     client: "Aston Martin",
//     assigned_by: "John2 Doe",
//     assigned_to: "Mark2 Clerk",
//   },
//   {
//     id: "3",
//     columnId: "overdue",
//     content: "Conduct security testing",
//     name: "Task 3",
//     date: "3 Dec, 23- 6:00PM ",
//     status: "Overdue",
//     client: "Aston Martin",
//     assigned_by: "John3 Doe",
//     assigned_to: "Mark3 Clerk",
//   },
//   {
//     id: "4",
//     columnId: "overdue",
//     content: "Analyze competitors",
//     name: "Task 4",
//     date: "4 Dec, 23- 6:00PM ",
//     status: "Overdue",
//     client: "Aston Martin",
//     assigned_by: "John4 Doe",
//     assigned_to: "Mark4 Clerk",
//   },
//   {
//     id: "5",
//     columnId: "inprogress",
//     content: "Create UI kit documentation",
//     name: "Task 5",
//     date: "5 Dec, 23- 6:00PM ",
//     status: "Inprogress",
//     client: "Aston Martin",
//     assigned_by: "John5 Doe",
//     assigned_to: "Mark5 Clerk",
//   },
//   {
//     id: "6",
//     columnId: "inprogress",
//     content: "Dev meeting",
//     name: "Task 6",
//     date: "6 Dec, 23- 6:00PM ",
//     status: "Inprogress",
//     client: "Aston Martin",
//     assigned_by: "John6 Doe",
//     assigned_to: "Mark6 Clerk",
//   },
//   {
//     id: "7",
//     columnId: "inprogress",
//     content: "Deliver dashboard prototype",
//     name: "Task 7",
//     date: "7 Dec, 23- 6:00PM ",
//     status: "Inprogress",
//     client: "Aston Martin",
//     assigned_by: "John7 Doe",
//     assigned_to: "Mark7 Clerk",
//   },
//   {
//     id: "8",
//     columnId: "pending",
//     content: "Optimize application performance",
//     name: "Task 8",
//     date: "8 Dec, 23- 6:00PM ",
//     status: "Pending",
//     client: "Aston Martin",
//     assigned_by: "John8 Doe",
//     assigned_to: "Mark8 Clerk",
//   },
//   {
//     id: "9",
//     columnId: "pending",
//     content: "Implement data validation",
//     name: "Task 9",
//     date: "9 Dec, 23- 6:00PM ",
//     status: "Pending",
//     client: "Aston Martin",
//     assigned_by: "John9 Doe",
//     assigned_to: "Mark9 Clerk",
//   },
//   {
//     id: "10",
//     columnId: "completed",
//     content: "Design database schema",
//     name: "Task 10",
//     date: "10 Dec, 23- 6:00PM ",
//     status: "pending",
//     client: "Aston Martin",
//     assigned_by: "John10 Doe",
//     assigned_to: "Mark10 Clerk",
//   },
//   {
//     id: "11",
//     columnId: "completed",
//     content: "Integrate SSL web certificates into workflow",
//     name: "Task 11",
//     date: "11 Dec, 23- 6:00PM ",
//     status: "Completed",
//     client: "Aston Martin",
//     assigned_by: "John11 Doe",
//     assigned_to: "Mark11 Clerk",
//   },
//   {
//     id: "12",
//     columnId: "overdue",
//     content: "Implement error logging and monitoring",
//     name: "Task 12",
//     date: "12 Dec, 23- 6:00PM ",
//     status: "Overdue",
//     client: "Aston Martin",
//     assigned_by: "John12 Doe",
//     assigned_to: "Mark12 Clerk",
//   },
//   {
//     id: "13",
//     columnId: "completed",
//     content: "Design and implement responsive UI",
//     name: "Task 13",
//     date: "13 Dec, 23- 6:00PM ",
//     status: "Completed",
//     client: "Aston Martin",
//     assigned_by: "John13 Doe",
//     assigned_to: "Mark13 Clerk",
//   },
// ];