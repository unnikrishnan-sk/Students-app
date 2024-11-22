import { add_student_icon, attendance, calendar, exam, fee, notice_icon, password_icon, student, sudoku, user_logo } from "../assets";

export const loginData = [{ id: 0, icon: user_logo, placeholder: "Username", value: 'username' }, { id: 1, icon: password_icon, placeholder: "Password", value: 'password' }]

export const adminDash = [{ id: 0, icon: student, text: 'Students', route: 'studentslist' }, { id: 1, icon: attendance, text: 'Attendance', route: 'attendance' }, { id: 2, icon: notice_icon, text: 'Notice', route: 'notice', route: 'notice' }, { id: 3, icon: fee, text: 'Fees', route: 'fees' }, { id: 4, icon: calendar, text: 'Calendars', route: 'calendars' }, { id: 5, icon: exam, text: 'Exams', route: 'exam' }, { id: 6, icon: sudoku, text: 'Sudoku', route: 'sudoku' }]

export const studentList = [{ id: 0, name: 'student 1' }, { id: 1, name: 'student 2' }, { id: 2, name: 'student 3' }, { id: 3, name: 'student 4' }, { id: 4, name: 'student 5' }, { id: 5, name: 'student 6' }, { id: 6, name: 'student 7' }, { id: 7, name: 'student 8' }]

export const studentDetails = [{ id: 0, name: 'Roll Number', value: 'rollNo', number: true }, { id: 1, name: 'Guardian Name', value: 'gurdName' }, { id: 2, name: 'Contact Number', number: true, value: 'contactNo' }]

export const examDetails = [{ id: 0, name: 'Exam Name', value: 'examName', number: true }, { id: 1, name: 'Subject', value: 'subject' }]

export const addFees = [{ id: 0, class: 'Class - 1', value: 'Class1', number: true }, { id: 1, class: 'Class - 2', value: 'Class2', number: true }, { id: 2, class: 'Class - 3', value: 'Class3', number: true }, { id: 3, class: 'Class - 4', value: 'Class4', number: true }, { id: 4, class: 'Class - 5', value: 'Class5', number: true }, { id: 5, class: 'Class - 6', value: 'Class6', number: true }, { id: 6, class: 'Class - 7', value: 'Class7', number: true }, { id: 7, class: 'Class - 8', value: 'Class8', number: true }, { id: 8, class: 'Class - 9', value: 'Class9', number: true }, { id: 9, class: 'Class - 10', value: 'Class10', number: true }]

export const calendarDet = [{ id: 0, date: '01', month: 'MAR', title: 'National Day', desc: 'Holiday' }, { id: 1, date: '10', month: 'MAR', title: 'Summer Holiday Event', desc: 'Event' }, { id: 2, date: '22', month: 'MAR', title: 'School Function', desc: 'Event' }, { id: 3, date: '26', month: 'MAR', title: 'Dean Meeting', desc: 'Event' }, { id: 4, date: '30', month: 'MAR', title: 'Carnival in the City', desc: 'Holiday' }]

export const classList = [{ id: 0, name: 'Class 1', value: 'class-1' }, { id: 1, name: 'Class 2', value: 'class-2' }, { id: 2, name: 'Class 3', value: 'class-3' }, { id: 3, name: 'Class 4', value: 'class-4' }, { id: 4, name: 'Class 5', value: 'class-5' }, { id: 5, name: 'Class 6', value: 'class-6' }, { id: 6, name: 'Class 7', value: 'class-7' }, { id: 7, name: 'Class 8', value: 'class-8' }, { id: 8, name: 'Class 9', value: 'class-9' }, { id: 9, name: 'Class 10', value: 'class-10' }]

export const sectionList = [{ id: 0, name: "A", value: "A" }, { id: 1, name: "B", value: "B" }, { id: 2, name: "C", value: "C" }]

export const genderList = [{ id: 0, name: "Male", value: "male" }, { id: 1, name: "Female", value: "female" }, { id: 2, name: "Other", value: "other" }]

export const academicYearList = [{ id: 0, name: "2024-2025", value: "2024-2025" }, { id: 1, name: "2025-2026", value: "2025-2026" }]

export const examDurationList = [{ id: 0, name: "15 min", value: "15 min" }, { id: 1, name: "30 min", value: "30 min" }, { id: 0, name: "45 min", value: "45 min" }, { id: 0, name: "1 hr", value: "1 hr" }, { id: 0, name: "1 hr 15 min", value: "1 hr 15 min" }, { id: 0, name: "2 hr", value: "2 hr" }, { id: 0, name: "3 hr", value: "3 hr" }]

export const totalMarksList = [{ id: 0, name: "15 marks", value: "15 marks" }, { id: 1, name: "30 marks", value: "30 marks" }, { id: 0, name: "50 marks", value: "50 marks" }, { id: 0, name: "100 marks", value: "100 marks" }]

export const schoolFeeDetails = [{ id: 0, title: "Total Fee", price: "$14,500", percent: 0.8 }, { id: 1, title: "Extra Fee", price: "$2,000", percent: 0.1 }, { id: 2, title: "Late Charges", price: "$600", percent: 0.06 }, { id: 4, title: "Discount (20%)", price: "-$500", percent: 0.05 }]

export const months = [{ id: 0, title: 'January' }, { id: 1, title: 'February' }, { id: 2, title: 'March' }, { id: 3, title: 'April' }, { id: 4, title: 'May' }, { id: 5, title: 'june' }, { id: 6, title: 'July' }, { id: 7, title: 'August' }, { id: 8, title: 'September' }, { id: 9, title: 'October' }, { id: 10, title: 'November' }, { id: 11, title: 'December' }]

export const feeMonthsDet = [{ id: 0, month: 'January', status: 'Paid' }, { id: 1, month: 'February', status: 'Paid' }, { id: 2, month: 'March', status: 'Paid' }, { id: 3, month: 'April', status: 'Paid' }, { id: 4, month: 'May', status: 'Paid' }, { id: 5, month: 'June', status: 'Paid' }, { id: 6, month: 'July', status: 'Paid' }, { id: 7, month: 'August', status: 'Not Paid' }, { id: 8, month: 'September', status: 'Not Paid' }, { id: 9, month: 'October', status: 'Not Paid' }, { id: 10, month: 'November', status: 'Not Paid' }, { id: 11, month: 'December', status: 'Not Paid' }]

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const inputValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const rulesSudoku = [{ id: 0, desc: 'Sudoku grid consists of 9x9 spaces.' }, { id: 1, desc: 'You can use only numbers from 1 to 9.' }, { id: 2, desc: 'Each 3×3 block can only contain numbers from 1 to 9.' }, { id: 3, desc: 'Each vertical column can only contain numbers from 1 to 9.' }, { id: 4, desc: 'Each horizontal row can only contain numbers from 1 to 9.' }, { id: 5, desc: 'Each diagonals (from top to right and top to left) can only contain numbers from 1 to 9.' }, { id: 6, desc: 'Each number in the 3×3 block, vertical column or horizontal row or each diagonal can be used only once.' }, { id: 7, desc: 'The game is over when the whole Sudoku grid is correctly filled with numbers.' }]

export const backgroundIndexes = [0, 1, 2, 9, 10, 11, 18, 19, 20, 6, 7, 8, 15, 16, 17, 24, 25, 26, 30, 31, 32, 39, 40, 41, 48, 49, 50, 54, 55, 56, 63, 64, 65, 72, 73, 74, 60, 61, 62, 69, 70, 71, 78, 79, 80]

export const initialSudoku = ["6", "4", "5", "3", "9", "7", "2", "8", "1", "7", "1", "3", "5", "8", "2", "9", "4", "6", "2", "8", "9", "6", "4", "1", "5", "7", "3", "8", "3", "2", "4", "7", "6", "1", "9", "5", "4", "9", "1", "8", "2", "5", "3", "6", "7", "5", "6", "7", "9", "1", "3", "8", "2", "4", "1", "5", "8", "2", "6", "4", "7", "3", "9", "9", "7", "6", "1", "3", "8", "4", "5", "2", "3", "2", "4", "7", "5", "9", "6", "1", "8"]
