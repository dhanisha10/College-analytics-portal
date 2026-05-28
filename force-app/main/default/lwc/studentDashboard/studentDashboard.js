import { LightningElement, wire } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentHomeController.getAllStudents';

export default class StudentDashboard extends LightningElement {

    students = [];
    filteredStudents = [];

    departmentSearch = '';
    placementSearch = '';

    totalStudents = 0;
    totalDepartments = 0;
    totalDayScholars = 0;
    totalHostellers = 0;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Department', fieldName: 'Department__c' },
        { label: 'Total Marks', fieldName: 'Total_Marks__c', type: 'number' },
        { label: 'Total Exams', fieldName: 'Total_Exams__c', type: 'number' },
        { label: 'Average Marks', fieldName: 'Average_Marks__c', type: 'number' },
        { label: 'Attendance %', fieldName: 'Attendance_Percentage__c', type: 'number' },
        { label: 'Student Type', fieldName: 'Student_Type__c' },
        { label: 'Placement Status', fieldName: 'Placement_Status__c' }
    ];

    @wire(getAllStudents)
    wiredStudents({ data, error }) {

        if (data) {

            this.students = data.map(item => ({
                Id: item.Id,
                Name: item.Name,
                Department__c: item.Department__r ? item.Department__r.Name : '',
                Total_Marks__c: item.Total_Marks__c,
                Total_Exams__c: item.Total_Exams__c,
                Average_Marks__c: item.Average_Marks__c,
                Attendance_Percentage__c: item.Attendance_Percentage__c,
                Student_Type__c: item.Student_Type__c,
                Placement_Status__c: item.Placement_Status__c ? 'Placed' : 'Not Placed'
            }));

            this.filteredStudents = this.students;

            // Total Students
            this.totalStudents = this.students.length;

            // Total Departments
            const deptSet = new Set();
            this.students.forEach(student => {
                if (student.Department__c) {
                    deptSet.add(student.Department__c);
                }
            });

            this.totalDepartments = deptSet.size;

            // Day Scholars
            this.totalDayScholars = this.students.filter(
                s => s.Student_Type__c === 'Day Scholar'
            ).length;

            // Hostellers
            this.totalHostellers = this.students.filter(
                s => s.Student_Type__c === 'Hosteller'
            ).length;

        }

        if (error) {
            console.error(error);
        }
    }

    handleDepartmentSearch(event) {
        this.departmentSearch = event.target.value.toLowerCase();
        this.applyFilters();
    }

    handlePlacementSearch(event) {
        this.placementSearch = event.target.value.toLowerCase();
        this.applyFilters();
    }

    applyFilters() {

        this.filteredStudents = this.students.filter(student => {

            const matchDepartment = this.departmentSearch
                ? student.Department__c.toLowerCase().includes(this.departmentSearch)
                : true;

            let matchPlacement = true;

            if (this.placementSearch === 'placed') {
                matchPlacement = student.Placement_Status__c === 'Placed';
            }
            else if (this.placementSearch === 'not placed') {
                matchPlacement = student.Placement_Status__c === 'Not Placed';
            }

            return matchDepartment && matchPlacement;

        });

    }

}