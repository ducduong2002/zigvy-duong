Auth module
  Controllers
      POST /auth/sign-up
      POST /auth/login
  Service
      JWT Service 
          sign token
          verify token
      block:  ( để nếu như có cái service trong moudel khác chỉ cần lấy block này ko cần pải tạo lại)
              Repository (Data Layer: Auth Schema (collection: user ))
              sẽ data base đó bắt đầu xử lý gọi đó là   Auth Repository
                                                          - findByEmail
                                                          - findByID
                                                          - UpdateByID  
                        
  Guard
      local guard
      custom guard (google, facebook)
    

User module
  Controllers
    PUT /users/profile
    DELETE /user/profile
  Service 
    repository (Data)
    block:  ( để nếu như có cái service trong moudel khác chỉ cần lấy block này ko cần pải tạo lại)
              Repository (Data Layer: Auth Schema (collection: user ))
              sẽ data base đó bắt đầu xử lý gọi đó là  User Repository
                                                        - findByEmail
                                                        - findByName
                                                        - UpdateByID

 
User task
  Controllers
    PUT /task/userId
    DELETE /task/userId
  Service 
    repository (Data)
    block:  ( để nếu như có cái service trong moudel khác chỉ cần lấy block này ko cần pải tạo lại)
              Repository (Data Layer: task Schema)
              sẽ data base đó bắt đầu xử lý gọi đó là  User Repository
                                                        - findByEmail
                                                        - findByName
                                                        - UpdateByID



  giải thích cho (API Controller -> Service -> MongoModel(Schema) -> MongoDB  khó xử lí các method 
API Controller -> Service -> Repository(methods) -> MongoModel(Schema) -> MongoDB )


cái luồng xử lý của nestjs
b1      controller để nhận hứng các yêu cầu từ bên ngoài ( tương tác lại bên ngoài )
        sẽ đưa về service 

b2      service để xử lý (service nó ko tự động thực hiện đc xử lý nó pải nhờ thằng khác là repository để xử lý ) 

b3      repository nhận  nó sẽ gửi xử lý đó như (find, create, ....) xong trả lại service 

b4      service để xét cái điệu kiện và trả lạ kết quả cuối cho controller 

b5      controller nhận lại cái kết quả cảu service: sẽ trả lại tương tác với DB