const Sequelize = require('sequelize');

// MODELS


const AdmissionAcademicRecordModel = require("../models/admission_academic_record");
const AdmissionModel = require("../models/admission");
const BatchModel = require("../models/batch");
const CampusModel = require("../models/campus");
const CategoryModel = require("../models/category");
const CourseFaqsModel = require("../models/course_faqs");
const CourseOutlineHeadingModel = require("../models/course_outline_heading");
const CourseOutlineTopicModel = require("../models/course_outline_topic");
const CourseModel = require("../models/course");
const EmployeeModel = require("../models/employee");
const EventGalleryModel = require("../models/event_gallery");
const EventHilightModel = require("../models/event_hilight");
const EventSpeakerModel = require("../models/event_speaker");
const EventModel = require("../models/event");
const InquiryModel = require("../models/inquiry");
const InquiryTransferModel = require("../models/inquiry_transfer");
const InquiryRemarksModel = require("../models/inquiry_remark");
const InstallmentModel = require("../models/installment");
const StudentActionRmarksModel = require("../models/student_action_remarks");
const StudentTransferModel = require("../models/student_transfer");
const StudentModel = require("../models/student");
const UserModel = require("../models/user");

// SEQUELIZE CONNECTION

const sequelize = new Sequelize("cims20200226", "root", "root1234", {
    host: "localhost",
    dialect: "mysql",
    // operatorsAliases: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// MODELS CREATIONS WITH SWQUELIZE

const AdmissionAcademicRecord = AdmissionAcademicRecordModel(sequelize, Sequelize);
const Admission = AdmissionModel(sequelize, Sequelize);
const Batch = BatchModel(sequelize, Sequelize);
const Campus = CampusModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const CourseFaqs = CourseFaqsModel(sequelize, Sequelize);
const CourseOutlineHeading = CourseOutlineHeadingModel(sequelize, Sequelize);
const CourseOutlineTopic = CourseOutlineTopicModel(sequelize, Sequelize);
const Course = CourseModel(sequelize, Sequelize);
const Employee = EmployeeModel(sequelize, Sequelize);
const EventGallery = EventGalleryModel(sequelize, Sequelize);
const EventHilight = EventHilightModel(sequelize, Sequelize);
const EventSpeaker = EventSpeakerModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);
const Inquiry = InquiryModel(sequelize, Sequelize);
const InquiryTransfer = InquiryTransferModel(sequelize, Sequelize);
const InquiryRemarks = InquiryRemarksModel(sequelize, Sequelize);
const Installment = InstallmentModel(sequelize, Sequelize);
const StudentActionRmarks = StudentActionRmarksModel(sequelize, Sequelize);
const StudentTransfer = StudentTransferModel(sequelize, Sequelize);
const Student = StudentModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);



//  RELATIONS

// TRANSFER STUDENT STARTS
// StudentTransfer.belongsTo(Batch);
// Batch.hasMany(StudentTransfer, { foreignKey: 'batchFromId', sourceKey: 'id' });

StudentTransfer.belongsTo(Batch);
Batch.hasMany(StudentTransfer, { foreignKey: 'batchToId', sourceKey: 'id' });

StudentTransfer.belongsTo(Admission);
Student.hasMany(StudentTransfer, { foreignKey: 'admissionId', sourceKey: 'id' });

// StudentTransfer.belongsTo(Campus);
// Campus.hasMany(StudentTransfer, { foreignKey: 'campusFromId', sourceKey: 'id' });

StudentTransfer.belongsTo(Campus);
Campus.hasMany(StudentTransfer, { foreignKey: 'campusToId', sourceKey: 'id' });

StudentTransfer.belongsTo(User);
User.hasMany(StudentTransfer, { foreignKey: 'userId', sourceKey: 'id' });

// StudentTransfer.belongsTo(User);
// User.hasMany(StudentTransfer, { foreignKey: 'userToId', sourceKey: 'id' });
// TRANSFER STUDENT ENDS

// ADMISSIONS STARTS
Admission.belongsTo(Inquiry);
Inquiry.hasMany(Admission, { foreignKey: 'inquiryId', sourceKey: 'id' });

Admission.belongsTo(User);
User.hasMany(Admission, { foreignKey: 'userId', sourceKey: 'id' });

Admission.belongsTo(Campus);
Campus.hasMany(Admission, { foreignKey: 'campusId', sourceKey: 'id' });

Admission.belongsTo(Batch);
Batch.hasMany(Admission, { foreignKey: 'batchId', sourceKey: 'id' });

Admission.belongsTo(Course);
Course.hasMany(Admission, { foreignKey: 'courseId', sourceKey: 'id' });
// ADMISSIONS ENDS

// BATCH STARTS
Batch.belongsTo(Course);
Course.hasMany(Batch, { foreignKey: 'courseId', sourceKey: 'id' });

Batch.belongsTo(User);
User.hasMany(Batch, { foreignKey: 'userId', sourceKey: 'id' });

Batch.belongsTo(Employee);
Employee.hasMany(Batch, { foreignKey: 'employeeId', sourceKey: 'id' });

Batch.belongsTo(Campus);
Campus.hasMany(Batch, { foreignKey: 'campusId', sourceKey: 'id' });
// BATCH ENDS

// TRANSFER INQUIRY STARTS
InquiryTransfer.belongsTo(Inquiry);
Inquiry.hasMany(InquiryTransfer, { foreignKey: 'inquiryId', sourceKey: 'id' });

InquiryTransfer.belongsTo(User);
User.hasMany(InquiryTransfer, { foreignKey: 'userId', sourceKey: 'id' });

InquiryTransfer.belongsTo(Campus);
Campus.hasMany(InquiryTransfer, { foreignKey: 'campusFromId', sourceKey: 'id' });

InquiryTransfer.belongsTo(Campus);
Campus.hasMany(InquiryTransfer, { foreignKey: 'campusToId', sourceKey: 'id' });
// TRANSFER INQUIRY ENDS

// INQUIRY STARTS
Inquiry.belongsTo(Course);
Course.hasMany(Inquiry, { foreignKey: 'courseId', sourceKey: 'id' });

Inquiry.belongsTo(User);
User.hasMany(Inquiry, { foreignKey: 'userId', sourceKey: 'id' });

Inquiry.belongsTo(Campus);
Campus.hasMany(Inquiry, { foreignKey: 'campusId', sourceKey: 'id' });
// INQUIRY ENDS

// COURSE STARTS
Course.belongsTo(Category);
Category.hasMany(Course, { foreignKey: 'categoryId', sourceKey: 'id' });

Course.belongsTo(User);
User.hasMany(Course, { foreignKey: 'userId', sourceKey: 'id' });
// COURSE ENDS

// STUDENT ACTION REMARKS STARTS
StudentActionRmarks.belongsTo(User);
User.hasMany(StudentActionRmarks, { foreignKey: 'userId', sourceKey: 'id' });

StudentActionRmarks.belongsTo(Student);
Student.hasMany(StudentActionRmarks, { foreignKey: 'studentId', sourceKey: 'id' });
// STUDENT ACTION REMARKS ENDS

// INQUIRY REMARKS STARTS
InquiryRemarks.belongsTo(User);
User.hasMany(InquiryRemarks, { foreignKey: 'userId', sourceKey: 'id' });

InquiryRemarks.belongsTo(Inquiry);
Inquiry.hasMany(InquiryRemarks, { foreignKey: 'inquiryId', sourceKey: 'id' });
// INQUIRY REMARKS ENDS

// STUDENT STARTS
Student.belongsTo(Admission);
Admission.hasMany(Student, { foreignKey: 'admissionId', sourceKey: 'id' });
// STUDENT ENDS

// INSTALLMENT STARTS
Installment.belongsTo(Admission);
Admission.hasMany(Installment, { foreignKey: 'admissionId', sourceKey: 'id' });
// INSTALLMENT ENDS

// EMPLOYEE STARTS
Employee.belongsTo(Campus);
Campus.hasMany(Employee, { foreignKey: 'campusId', sourceKey: 'id' });
// EMPLOYEE ENDS

// USER STARTS
User.belongsTo(Employee);
Employee.hasMany(User, { foreignKey: 'employeeId', sourceKey: 'id' });
// USER ENDS

// ADMISSION ACADEMIC RECORD STARTS
AdmissionAcademicRecord.belongsTo(Student);
Student.hasMany(AdmissionAcademicRecord, { foreignKey: 'studentId', sourceKey: 'id' });
// ADMISSION ACADEMIC RECORD ENDS

// COURSE FAQS STARTS
CourseFaqs.belongsTo(Course);
Course.hasMany(CourseFaqs, { foreignKey: 'courseId', sourceKey: 'id' });
// COURSE FAQS RECORD ENDS

// COURSE OUTLINE HEADING STARTS
CourseOutlineHeading.belongsTo(Course);
Course.hasMany(CourseOutlineHeading, { foreignKey: 'courseId', sourceKey: 'id' });
// COURSE OUTLINE HEADING ENDS

// COURSE OUTLINE TOPIC STARTS
CourseOutlineTopic.belongsTo(CourseOutlineHeading);
CourseOutlineHeading.hasMany(CourseOutlineTopic, { foreignKey: 'id', sourceKey: 'id' });
// COURSE OUTLINE TOPIC ENDS

// EVENT GALLERY STARTS
EventGallery.belongsTo(Event);
Event.hasMany(EventGallery, { foreignKey: 'eventId', sourceKey: 'id' });
// EVENT GALLERY ENDS

// EVENT HILIGHT STARTS
EventHilight.belongsTo(Event);
Event.hasMany(EventHilight, { foreignKey: 'eventId', sourceKey: 'id' });
// EVENT HILIGHT ENDS

// EVENT SPEAKERS STARTS
EventSpeaker.belongsTo(Event);
Event.hasMany(EventSpeaker, { foreignKey: 'eventId', sourceKey: 'id' });
// EVENT SPEAKERS ENDS

//TO UPDATE SCHEMA

// sequelize.sync({ alter: true }).then(() => {
//     console.log(`Database & tables created!`);
// });



// EXPORT MODELS

module.exports = {

    AdmissionAcademicRecord,
    Admission,
    Batch,
    Campus,
    Category,
    CourseFaqs,
    CourseOutlineHeading,
    CourseOutlineTopic,
    Course,
    Employee,
    EventGallery,
    EventHilight,
    EventSpeaker,
    Event,
    Inquiry,
    InquiryTransfer,
    InquiryRemarks,
    Installment,
    StudentActionRmarks,
    StudentTransfer,
    Student,
    User

}; 