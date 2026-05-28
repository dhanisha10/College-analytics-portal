public with sharing class StudentHomeController {

    // 🔹 1️⃣ Department Wise Average Attendance
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getDepartmentAvgAttendance() {
        return [
            SELECT Department__r.Name,
                   AVG(Attendance_Percentage__c) avgAttendance
            FROM Student__c
            WHERE Department__r.Name != null
            GROUP BY Department__r.Name
        ];
    }

    // 🔹 2️⃣ Department Wise Average Marks
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getDepartmentAvgMarks() {
        return [
            SELECT Department__r.Name,
                   AVG(Average_Marks__c) avgMarks
            FROM Student__c
            WHERE Department__r.Name != null
            GROUP BY Department__r.Name
        ];
    }

    // 🔹 3️⃣ Student Dashboard (Full Student Table Data)
    @AuraEnabled(cacheable=true)
    public static List<Student__c> getAllStudents() {
        return [
            SELECT Id,
                   Name,
                   Department__r.Name,
                   Total_Marks__c,
                   Total_Exams__c,
                   Average_Marks__c,
                   Attendance_Percentage__c,
                   Student_Type__c,
                   Placement_Status__c
            FROM Student__c
            ORDER BY Name
        ];
    }
    // 🔹 4️⃣ Top 3 Students (Highest Average Marks)
@AuraEnabled(cacheable=true)
public static List<Student__c> getTopStudents() {
    return [
        SELECT Id,
               Name,
               Average_Marks__c,
               Department__r.Name
        FROM Student__c
        WHERE Average_Marks__c != null
        ORDER BY Average_Marks__c DESC
        LIMIT 3
    ];
}
}