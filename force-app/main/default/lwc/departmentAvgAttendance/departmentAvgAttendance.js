import { LightningElement, wire } from 'lwc';
import getDepartmentAvgAttendance from '@salesforce/apex/StudentHomeController.getDepartmentAvgAttendance';

export default class DepartmentAvgAttendance extends LightningElement {
    attendanceData;

    @wire(getDepartmentAvgAttendance)
    wiredData({ data, error }) {
        if (data) {
            console.log('data==> ',JSON.stringify(data));
            
            this.attendanceData = data.map(item => ({
                department: item.Name,
                avgAttendance: item.avgAttendance
            }));
            console.log('test', this.attendanceData);
        }
    }
}