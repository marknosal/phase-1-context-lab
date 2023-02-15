/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


const createEmployeeRecord = function (newEmployeeData) {
    return {
        firstName: newEmployeeData[0],
        familyName: newEmployeeData[1],
        title: newEmployeeData[2],
        payPerHour: newEmployeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = function (newEmployeesData) {
    return newEmployeesData.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = function (timeIn) {
    const timeInArray = timeIn.split(' ')
    const timeinEvent = {
        type: 'TimeIn',
        hour: parseInt(timeInArray[1], 10),
        date: timeInArray[0],
    }
    this.timeInEvents.push(timeinEvent)
    return this
}

const createTimeOutEvent = function (timeOut) {
    const timeOutArray = timeOut.split(' ')
    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(timeOutArray[1], 10),
        date: timeOutArray[0],
    }
    this.timeOutEvents.push(timeOutEvent)
    return this
}

const hoursWorkedOnDate = function (date) {
    const clockInData = this.timeInEvents.find(data => data.date === date)
    const clockOutData = this.timeOutEvents.find(data => data.date === date)
    return (parseInt(clockOutData.hour, 10) - parseInt(clockInData.hour, 10)) / 100
}

const wagesEarnedOnDate = function (date) {
    const earnings = this.payPerHour * hoursWorkedOnDate.call(this, date)
    return earnings
}

const allWagesFor = function () {
    const daysWorked = this.timeInEvents.map(event => event.date)
    const allPaychecks = daysWorked.map(date => wagesEarnedOnDate.call(this, date))
    const employeeEarnings = allPaychecks.reduce((sum, paycheck) => sum + paycheck)
    return employeeEarnings
}

//  const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

const findEmployeeByFirstName = function (srcArray, firstName) {
    const employee = srcArray.find((employee) => employee.firstName === firstName)
    return employee
}

const calculatePayroll = function(allEmployees) {
    const payroll = allEmployees.reduce((total, employee) => total + allWagesFor.call(employee), 0)
    return payroll
}

// let calculatePayroll = function(arrayOfEmployeeRecords){
//     return arrayOfEmployeeRecords.reduce(function(memo, rec){
//         return memo + allWagesFor(rec)
//     }, 0)
// }