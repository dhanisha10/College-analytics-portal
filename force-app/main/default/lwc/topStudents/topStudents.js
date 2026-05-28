import { LightningElement, wire } from 'lwc';
import getTopStudents from '@salesforce/apex/StudentHomeController.getTopStudents';

export default class TopStudents extends LightningElement {

    students = [];

    @wire(getTopStudents)
    wiredStudents({ error, data }) {
        if (data) {

            this.students = data.map((student, index) => {

                let medal = '';

                if(index === 0){
                    medal = '🥇';
                } 
                else if(index === 1){
                    medal = '🥈';
                } 
                else if(index === 2){
                    medal = '🥉';
                }

                return {
                    ...student,
                    medal: medal
                };

            });

        }

        if (error) {
            console.error(error);
        }
    }

}