import { LightningElement, wire } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentHomeController.getAllStudents';

export default class StudentSummary extends LightningElement {

    totalStudents = 0;
    totalDepartments = 0;

    @wire(getAllStudents)
    wiredStudents({ data, error }) {

        if (data) {

            this.totalStudents = data.length;

            const deptSet = new Set();

            data.forEach(student => {
                if (student.Department__c) {
                    deptSet.add(student.Department__c);
                }
            });

            this.totalDepartments = deptSet.size;
        }

        if (error) {
            console.error('Error loading students', error);
        }
    }

}