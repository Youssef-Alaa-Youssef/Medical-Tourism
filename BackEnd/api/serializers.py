from rest_framework import serializers
from .models import Doctor,Tretment_center,WebsiteUsers,Tourism_Company_Feedback,TourismCompany,TourismPlaces,MedicalReservation,TourismReservation,Treatment_Center_Feedback,Treatment_Payment,Tourism_Payment



class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('__all__')





class Tretment_CenterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tretment_center
        fields = ('__all__')



class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model=WebsiteUsers
        fields='__all__'
        


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourismCompany
        fields = '__all__'

class PlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourismPlaces
        fields = '__all__'



class UserEmail(serializers.ModelSerializer):
    class Meta:
        model = WebsiteUsers
        fields = ('Email',)

class PlaceName(serializers.ModelSerializer):
    class Meta:
        model = TourismPlaces
        fields = ('name',)
class TourismReservationSerializer(serializers.ModelSerializer):
    tourism_places = PlaceName()
    user = UserEmail()
    class Meta:
        model = TourismReservation
        # fields = '__all__'
        fields = ['id','start_time','end_time','price','status','user','tourism_company','tourism_places']



class DoctorName(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('name',)


class MedicalReservationSerializer(serializers.ModelSerializer):
    doctor = DoctorName()
    user = UserEmail()

    class Meta:
        model = MedicalReservation
        # fields = '__all__'
        fields = ('id', 'start_time', 'end_time', 'price', 'status', 'user', 'treatment_center', 'doctor')

class MedicalReservationsSerializer(serializers.ModelSerializer):


    class Meta:
        model = MedicalReservation
        fields = '__all__'



class TourismReservationsSerializer(serializers.ModelSerializer):


    class Meta:
        model = TourismReservation
        fields = '__all__'




class feedbackSerializer(serializers.ModelSerializer):
    user = UsersSerializer()

    class Meta:
        model = Treatment_Center_Feedback
        fields = '__all__'



class feedbackSerializer_tourism(serializers.ModelSerializer):
    user = UsersSerializer()

    class Meta:
        model = Tourism_Company_Feedback
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment_Payment
        fields = '__all__'
class TourismPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourism_Payment
        fields = '__all__'