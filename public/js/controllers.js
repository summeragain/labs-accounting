'use strict';

angular.module('myApp.controllers', [])

.controller('Teachers', ['$scope', 'teacherList', 'Auth', function($scope, teacherList, Auth) {
  $scope.login = Auth.data;
  $scope.teacherList = teacherList.data;
  
  $scope.edit = function() {
    window.location.hash += '/edit';
  }
}])

.controller('TeachersEdit', ['$scope', 'teacherFullList', 'Backend', 'Auth', function($scope, teacherFullList, Backend, Auth) {
  $scope.login = Auth.data;
  $scope.teacherList = teacherFullList.data;
  
  $scope.newTeacher = { accessType: 1 };
  $scope.addNewTeacher = function() {
    Backend
      .addNewTeacher($scope.newTeacher)
      .then(function(result) {
        $scope.teacherList.push(result.data[0]);
        $scope.newTeacher = { accessType: 1 };
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.deleteTeacher = function(id) {
    Backend
      .deleteTeacher({ id: id })
      .then(function(result) {
        var teachers = [];
        for(var i = 0; i < $scope.teacherList.length; ++i)
          if($scope.teacherList[i].id != id)
            teachers.push($scope.teacherList[i]);
        
        $scope.teacherList = teachers;
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.changeName = function(id, v) {
    if(v.length < 2)
      return "Teacher's name is too short!";
    
    Backend.editTeacher({
      id: id,
      name: v
    })
  }
  $scope.changeSurname = function(id, v) {
    if(v.length < 2)
      return "Teacher's surname is too short!";
    
    Backend.editTeacher({
      id: id,
      surname: v
    })
  }
  $scope.changePatronymic = function(id, v) {
    if(v.length < 2)
      return "Teacher's patronymic is too short!";
    
    Backend.editTeacher({
      id: id,
      patronymic: v
    })
  }
  
  $scope.changeLogin = function(id, v) {
    if(v.length < 5)
      return "Teacher's login is too short!";
    
    Backend.editTeacher({
      id: id,
      login: v
    })
  }
  $scope.changePassword = function(id, v) {
    if(v.length < 6)
      return "Teacher's password is too short!";
    
    Backend.editTeacher({
      id: id,
      hash: v
    })
  }
  
  $scope.changeAccess = function(id, v) {
    Backend.editTeacher({
      id: id,
      accessType: parseInt(v)
    })
  }
}])

.controller('ConcreteTeacher', ['$scope', 'teacherInfo', 'coursesList', 'Auth', function($scope, teacherInfo, coursesList, Auth) {
  $scope.login = Auth.data;
  $scope.info = teacherInfo.data;
  $scope.coursesList = coursesList.data;
  
  $scope.edit = function() {
    window.location.hash += '/edit';
  }
}])

.controller('ConcreteTeacherEdit', ['$scope', 'teacherInfo', 'coursesList', 'groupList', 'Auth', 'Backend', function($scope, teacherInfo, coursesList, groupList, Auth, Backend) {
  $scope.info = teacherInfo.data;
  $scope.coursesList = coursesList.data;
  $scope.groupList = groupList.data;
  
  $scope.groupInfo = { };
  for(var i = 0; i < $scope.groupList.length; ++i)
    $scope.groupInfo[$scope.groupList[i].id] = $scope.groupList[i];
  
  $scope.addCourse = function() {
    $scope.newCourse.teacher = $scope.info.id;
    
    Backend
      .addCourse($scope.newCourse)
      .then(function(result) {
        $scope.coursesList.push(result.data[0]);
        $scope.newCourse = { };
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.deleteCourse = function(id) {
    Backend
      .deleteCourse({ id: id })
      .then(function(result) {
        var courses = [];
        for(var i = 0; i < $scope.coursesList.length; ++i)
          if($scope.coursesList[i].id != id)
            courses.push($scope.coursesList[i]);
        
        $scope.coursesList = courses;
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.changeTitle = function(id, v) {
    if(v.length < 2)
      return "Title is too short!";
    
    Backend.editCourse({
      id: id,
      title: v
    })
  }
  $scope.changeGroup = function(id, v) {
    Backend.editCourse({
      id: id,
      group: parseInt(v)
    })
  }
  $scope.changeQuarter = function(id, v) {
    if(v != parseInt(v))
      return "Please enter a number!";
    
    Backend.editCourse({
      id: id,
      quarter: v
    })
  }
}])

.controller('Groups', ['$scope', 'groupList', 'Auth', function($scope, groupList, Auth) {
  $scope.login = Auth.data;
  $scope.groupList = groupList.data;
  
  $scope.edit = function() {
    window.location.hash += '/edit';
  }
}])

.controller('GroupsEdit', ['$scope', 'groupList', 'Backend', function($scope, groupList, Backend) {
  $scope.groupList = groupList.data;
  
  $scope.newGroup = { isDistanced: 0 };
  $scope.addGroup = function() {
    Backend
      .addGroup($scope.newGroup)
      .then(function(result) {
        $scope.groupList.push(result.data[0]);
        $scope.newGroup = { };
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.deleteGroup = function(id) {
    Backend
      .deleteGroup({ id: id })
      .then(function(result) {
        var groups = [];
        for(var i = 0; i < $scope.groupList.length; ++i)
          if($scope.groupList[i].id != id)
            groups.push($scope.groupList[i]);
        
        $scope.groupList = groups;
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.changeName = function(id, v) {
    if(v.length < 2)
      return "Group name is too short!";
    
    Backend.editGroup({
      id: id,
      name: v
    })
  }
  $scope.changeType = function(id, v) {
    Backend.editGroup({
      id: id,
      isDistanced: v
    })
  }
}])

.controller('ConcreteGroup', ['$scope', 'coursesList', 'groupInfo', 'Auth', function($scope, coursesList, groupInfo, Auth) {
  $scope.login = Auth.data;
  $scope.groupCoursesList = coursesList.data;
  $scope.info = groupInfo.data;
  
  var maxQuarter = 0;
  $scope.quarters = { };
  coursesList.data.map(function(v) {
    if($scope.quarters[v.quarter] === undefined) {
      $scope.quarters[v.quarter] = {
        visible: false,
        count: 1,
        id: v.quarter
      }
      
      if(v.quarter > maxQuarter)
        maxQuarter = v.quarter;
    }
    
    ++$scope.quarters[v.quarter].count;
  })
  
  if($scope.quarters[maxQuarter])
    $scope.quarters[maxQuarter].visible = true;
  
  $scope.view = function() {
    window.location.hash += '/students';
  }
  $scope.edit = function() {
    window.location.hash += '/edit';
  }
}])

.controller('ConcreteGroupStudents', ['$scope', 'studentsList', 'groupInfo', function($scope, studentsList, groupInfo) {
  $scope.studentsList = studentsList.data;
  $scope.info = groupInfo.data;
}])

.controller('ConcreteGroupEdit', ['$scope', 'studentsList', 'groupInfo', 'Backend', function($scope, studentsList, groupInfo, Backend) {
  $scope.studentsList = studentsList.data;
  $scope.info = groupInfo.data;
  
  $scope.newStudent = { };
  $scope.addNewStudent = function() {
    $scope.newStudent.group = groupInfo.data.id;
    Backend
      .addNewStudent($scope.newStudent)
      .then(function(result) {
        $scope.studentsList.push(result.data[0]);
        $scope.newStudent = { };
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.deleteStudent = function(id) {
    $scope.newStudent.group = groupInfo.data.id;
    Backend
      .deleteStudent({ id: id })
      .then(function(result) {
        var students = [];
        for(var i = 0; i < $scope.studentsList.length; ++i)
          if($scope.studentsList[i].id != id)
            students.push($scope.studentsList[i]);
        
        $scope.studentsList = students;
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.changeName = function(id, v) {
    if(v.length < 2)
      return "Name is too short!";
    
    Backend.editStudent({
      id: id,
      name: v
    })
  }
  $scope.changeSurname = function(id, v) {
    if(v.length < 2)
      return "Surname is too short!";
    
    Backend.editStudent({
      id: id,
      surname: v
    })
  }
  $scope.changePatronymic = function(id, v) {
    if(v.length < 2)
      return "Patronymic is too short!";
    
    Backend.editStudent({
      id: id,
      patronymic: v
    })
  }
}])

.controller('MainController', ['$scope', '$timeout', 'Backend', 'Auth', function($scope, $timeout, Backend, Auth) {
  $scope.login = Auth.data;
  
  $scope.loginWindowVisibility = false;
  $scope.toggleLogin = function() {
    $scope.loginWindowVisibility = !$scope.loginWindowVisibility;
  }

  $scope.auth = { };
  $scope.performAuth = function() {
    Backend
      .performLogin($scope.auth.login, $scope.auth.password)
      .then(successfulLogin, failedLogin);
  }
  
  var successfulLogin = function(data) {
    $timeout(function() {
      $scope.loginWindowVisibility = false;
      
      Auth.set({
        id: data.id,
        pubkey: data.pubkey,
        login: data.login,
        name: data.name,
        surname: data.surname,
        access: data.accessType
      })
    })
  }
  var failedLogin = function() {
    alert('Unable to login! Please, check authorization credentials.');
  }
  
  $scope.performLogout = function() {
    Auth.clear();
    //window.location.reload();
  }
}])

.controller('ConcreteCourse', ['$scope', 'courseInfo', 'labsList', 'testsList',
                               'labsMarksList', 'testsMarksList', 'studentsList', 'Auth',
                               function($scope, courseInfo, labsList, testsList, labsMarksList, testsMarksList, studentsList, Auth) 
{
  $scope.login = Auth.data;
  $scope.info = courseInfo.data;
  $scope.labsList = labsList.data;
  $scope.testsList = testsList.data;
  $scope.studentsList = studentsList.data;
  
  $scope.calcScale = function(studentId, labId) {
    var mark = ($scope.labMarks[studentId] || [])[labId];
    
    if(!mark)
      return '';
    
    if(mark < 61)
      return 'bad-mark';
    
    if(mark < 75)
      return 'average-mark';
    
    if(mark < 90)
      return 'almost-good-mark';
    
    return 'good-mark';
  }
  
  $scope.getTotalSumm = function() {
    var summ = 0;
    for(var i = 0; i < $scope.labsList.length; ++i)
      summ += $scope.labsList[i].refMark;
    
    return summ;
  }
  
  $scope.totalMarks = { };
  $scope.getMark = function(studentId) {
    if($scope.totalMarks[studentId] < 60)
      return 'F';
    
    if($scope.totalMarks[studentId] <= 70)
      return 'E';
    
    if($scope.totalMarks[studentId] <= 75)
      return 'D';
    
    if($scope.totalMarks[studentId] <= 80)
      return 'C';
    
    if($scope.totalMarks[studentId] < 90)
      return 'B';
    
    return 'A';
  }
  
  $scope.calcSum = function(studentId) {
    var summ = 0;
    var student = $scope.labMarks[studentId] || [];
    
    var ref = { };
    $scope.labsList.map(function(v) {
      ref[v.id] = v.refMark;
    })
    
    for(var i in student)
      summ += parseInt(student[i]) * ref[i] / 100;
    
    var tests = $scope.testMarks[studentId] || [];
    for(var i in tests)
      summ += parseInt(tests[i])
    
    $scope.totalMarks[studentId] = summ;
    return summ;
  }
  
  $scope.labMarks = { };
  for(var i = 0; i < labsMarksList.data.length; ++i) {
    $scope.labMarks[labsMarksList.data[i].student] = $scope.labMarks[labsMarksList.data[i].student] || { };
    $scope.labMarks[labsMarksList.data[i].student][labsMarksList.data[i].lab] = labsMarksList.data[i].weight;
  }
  
  $scope.testMarks = { };
  for(var i = 0; i < testsMarksList.data.length; ++i) {
    $scope.testMarks[testsMarksList.data[i].student] = $scope.testMarks[labsMarksList.data[i].student] || { };
    $scope.testMarks[testsMarksList.data[i].student][testsMarksList.data[i].test] = testsMarksList.data[i].count;
  }
  
  $scope.edit = function() {
    window.location.hash += '/edit';
  }
}])

.controller('ConcreteCourseEdit', ['$scope', 'courseInfo', 'labsList', 'testsList',
                                   'labsMarksList', 'testsMarksList', 'studentsList', 'Auth', 'Backend',
                                   function($scope, courseInfo, labsList, testsList, labsMarksList, testsMarksList, studentsList, Auth, Backend) 
{
  $scope.login = Auth.data;
  $scope.info = courseInfo.data;
  $scope.labsList = labsList.data;
  $scope.testsList = testsList.data;
  $scope.studentsList = studentsList.data;
  
  $scope.getTotalSumm = function() {
    var summ = 0;
    for(var i = 0; i < $scope.labsList.length; ++i)
      summ += $scope.labsList[i].refMark;
    
    return summ;
  }
  
  $scope.calcSum = function(studentId) {
    var summ = 0;
    var student = $scope.labMarks[studentId] || [];
    
    var ref = { };
    $scope.labsList.map(function(v) {
      ref[v.id] = v.refMark;
    })
    
    for(var i in student)
      summ += parseInt(student[i]) * ref[i] / 100;
    
    var tests = $scope.testMarks[studentId] || [];
    for(var i in tests)
      summ += parseInt(tests[i]);
      
    return summ;
  }
  
  $scope.labMarks = { };
  $scope.testMarks = { };
  for(var i = 0; i < $scope.studentsList.length; ++i) {
    $scope.labMarks[$scope.studentsList[i].id] = { };
    $scope.testMarks[$scope.studentsList[i].id] = { };
  }
  
  for(var i = 0; i < labsMarksList.data.length; ++i)
    $scope.labMarks[labsMarksList.data[i].student][labsMarksList.data[i].lab] = labsMarksList.data[i].weight;
  
  for(var i = 0; i < testsMarksList.data.length; ++i)
    $scope.testMarks[testsMarksList.data[i].student][testsMarksList.data[i].test] = testsMarksList.data[i].count;
  
  $scope.setTestMark = function(studentId, testId, v) {
    if(v != parseInt(v))
      return "Please enter a number!";
    v = parseInt(v);
    
    if(v < 0 || v > 100)
      return "The number should be in range from 0 to 100";
    
    Backend.setTestMark({
      student: studentId,
      test: testId,
      count: v
    })
  }
  $scope.setMark = function(studentId, labId, v) {
    if(v != parseInt(v))
      return "Please enter a number!";
    v = parseInt(v);
    
    if(v < 0 || v > 100)
      return "The number should be in range from 0 to 100";
    
    Backend.setMark({
      student: studentId,
      lab: labId,
      weight: v
    })
  }
  
  $scope.deleteLab = function(id) {
    Backend
      .deleteLab({ id: id })
      .then(function(result) {
        var labs = [];
        for(var i = 0; i < $scope.labsList.length; ++i)
          if($scope.labsList[i].id != id)
            labs.push($scope.labsList[i]);
        
        $scope.labsList = labs;
      }, function(result) {
        console.error(result);
      })
  }
  $scope.deleteTest = function(id) {
     Backend
      .deleteTest({ id: id })
      .then(function(result) {
        var tests = [];
        for(var i = 0; i < $scope.testsList.length; ++i)
          if($scope.testsList[i].id != id)
            tests.push($scope.testsList[i]);
        
        $scope.testsList = tests;
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.newLabInfo = { };
  $scope.addLab = function() {
    $scope.newLabInfo.course = $scope.info.id;
    
    Backend
      .addLab($scope.newLabInfo)
      .then(function(result) {
        $scope.labsList.push(result.data[0]);
        $scope.newLabInfo = { };
      }, function(result) {
        console.error(result);
      })
  }
  $scope.newTestInfo = { };
  $scope.addTest = function() {
    $scope.newTestInfo.course = $scope.info.id;
    
    Backend
      .addTest($scope.newTestInfo)
      .then(function(result) {
        $scope.testsList.push(result.data[0]);
        $scope.newTestInfo = { };
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.editLabRefMark = function editLabRefMark(id, v) {
    if(v != parseInt(v))
      return "Please enter a number!";
    v = parseInt(v);
    
    Backend.editLab({
      id: id,
      refMark: v
    })
  }
  $scope.editLabName = function editLabRefMark(id, v) {
    if(v.length < 3)
      return 'Lab name is too short!';
    
    Backend.editLab({
      id: id,
      name: v
    })
  }
  $scope.editTestName = function editLabRefMark(id, v) {
    if(v.length < 3)
      return 'Test name is too short!';
    
    Backend.editTest({
      id: id,
      name: v
    })
  }
}])