import { LightningElement, wire } from 'lwc';
import getDepartmentAvgMarks from '@salesforce/apex/StudentHomeController.getDepartmentAvgMarks';

export default class DepartmentAvgMarks extends LightningElement {
    marksData;

    @wire(getDepartmentAvgMarks)
    wiredData({ data, error }) {
        if (data) {
            console.log('data2==>',JSON.stringify(data));
            
            this.marksData = data.map(item => ({
                department: item.Name,
                avgMarks: item.avgMarks
            }));
        }
    }
}