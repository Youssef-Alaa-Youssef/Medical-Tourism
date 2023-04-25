# import unittest

# def add(x, y):
#     return x + y

# class TestAdd(unittest.TestCase):
#     def test_add(self):
#         self.assertEqual(add(2, 3), 5)
#         self.assertEqual(add(0, 0), 0)
#         self.assertEqual(add(-1, 1), 0)

# if __name__ == '__main__':
#     unittest.main()

#
# Question number 1
#
import unittest

# def car_speed_level(speed):
#     if speed < 0 or speed >= 220:
#         return "Invalid"
#     elif speed < 40:
#         return "Low"
#     elif speed < 120:
#         return "Normal"
#     elif speed < 200:
#         return "High"
#     else:
#         return "V.High"

# class TestCarSpeedLevel(unittest.TestCase):
#     def setUp(self) -> None:
#        print('start up')
#     def tearDown(self) -> None:
#         print('tear down')
   
#     def test_low_speed(self):
#         self.assertEqual(car_speed_level(10), "Low")

#     def test_high_speed(self):
#         self.assertEqual(car_speed_level(250), "Invalid")

#     def test_normal_speed(self):
#         self.assertEqual(car_speed_level(201), "Normal")
#     def test_normal_speed(self):
#         self.assertEqual(car_speed_level(80), "Normal")

#     def test_invalid_speed(self):
#         self.assertEqual(car_speed_level(-10), "Invalid")

# if __name__ == '__main__':
#     unittest.main()
    
    
#
# Question number 2
#   
    
def student_score_level(score):
    if score < 0 or score > 100:
        return "Invalid"
    elif score < 50:
        return "Failed"
    elif score < 65:
        return "Passed"
    elif score < 75:
        return "Good"
    elif score < 85:
        return "V.Good"
    elif score <= 100:
        return "Excellent"
    
class TestStudentScoreLevel(unittest.TestCase):
    def setUp(self) -> None:
        print('start up')
    def tearDown(self) -> None:
        print('tear down')
    def test_invalid_score(self):
        self.assertEqual(student_score_level(-10), "Invalid")
        self.assertEqual(student_score_level(110), "Invalid")

    def test_failed_score1(self):
        self.assertEqual(student_score_level(30), "Failed")
    def test_passed_score2(self):
        self.assertEqual(student_score_level(60), "Passed")
    def test_passed_score3(self):
        self.assertEqual(student_score_level(70), "Good")
    def test_passed_score4(self):
        self.assertEqual(student_score_level(80), "V.Good")
    def test_excellent_score5(self):
        self.assertEqual(student_score_level(95), "Excellent")

if __name__ == '__main__':
    unittest.main()