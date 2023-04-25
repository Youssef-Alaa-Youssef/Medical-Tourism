from django.shortcuts import render, redirect, get_object_or_404, reverse
from django.http import HttpResponse
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from .serializers import DoctorSerializer,Tretment_CenterSerializer, feedbackSerializer_tourism,UsersSerializer,feedbackSerializer ,CompanySerializer,PlacesSerializer,MedicalReservationSerializer,TourismReservationSerializer,MedicalReservationsSerializer,TourismReservationsSerializer,PaymentSerializer,TourismPaymentSerializer
from .models import TourismCompany,TourismPlaces,WebsiteUsers,Doctor,Treatment_Center_Feedback,Tretment_center,TourismReservation,MedicalReservation,Treatment_Center_Rating,Tourism_Company_Rating,Tourism_Company_Feedback,Activation,Treatment_Payment,Tourism_Payment

from rest_framework.decorators import api_view
from rest_framework import status
import jwt
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from django.db.models import Avg

from decimal import Decimal

from django.core import signing
from django.conf import settings

from rest_framework.exceptions import ValidationError






############################## Tourism Company ##############################

@api_view(['GET', 'POST'])
def all_companies(request):
    if request.method == 'GET':
        all_Comapny = TourismCompany.objects.filter(verfied_byadmin=True)
        comapanies_serializer = CompanySerializer(all_Comapny, many=True)
        return Response(comapanies_serializer.data)
    elif request.method == 'POST':
        comapny_serializer = CompanySerializer(data=request.data)
        if comapny_serializer.is_valid():
            comapny_serializer.save()
            response_data = comapny_serializer.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(comapny_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#####################################################################
@api_view(['GET', 'PUT', 'DELETE'])
def oneTourismCompany(request, id):
    one_company = TourismCompany.objects.all().get(pk=id)
    if request.method == 'GET':
        one_company_Ser = CompanySerializer(one_company, many=False)
        return Response(one_company_Ser .data)
    elif request.method == 'PUT':
        one_ser = CompanySerializer(data=request.data, instance=one_company, partial=True)
        if one_ser.is_valid():
            one_ser.save()
            return Response(one_ser.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE':
        one_company.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
##########################################

def tourismApi(request):
    return HttpResponse("Welcome to All Apis")

@api_view(['GET', 'PUT', 'DELETE'])
def one_TourismCompany_emaill(request, email):
    one_Tourism = TourismCompany.objects.get(email=email)
    if request.method == 'GET':
        one_Tourism_Ser = CompanySerializer(one_Tourism, many=False)
        return Response(one_Tourism_Ser .data)
    elif request.method == 'PUT':
        one_ser = CompanySerializer(data=request.data, instance=one_Tourism, partial=True)
        if one_ser.is_valid():
            one_ser.save()
            return Response(one_ser.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE':
        one_Tourism.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
def Get_Tourism_Company_Places(request):
    tourism_company_id = request.data.get('id')
    try:
        treatment_center = TourismCompany.objects.get(pk=tourism_company_id)
    except TourismCompany.DoesNotExist:
        return Response({'error': 'No treatment center found'}, status=status.HTTP_404_NOT_FOUND)

    places = TourismPlaces.objects.filter(tourismCompany=tourism_company_id)
    serializer = PlacesSerializer(places, many=True)

    return Response({'places': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def Get_Tourism_Company_Reservations(request):
    tourism_company_id = request.data.get('id')
    try:
        treatment_center = TourismCompany.objects.get(pk=tourism_company_id)
    except TourismCompany.DoesNotExist:
        return Response({'error': 'No treatment center found'}, status=status.HTTP_404_NOT_FOUND)

    reservations = TourismReservation.objects.filter(tourism_company=tourism_company_id)
    serializer = TourismReservationSerializer(reservations, many=True)

    return Response({'reservations': serializer.data}, status=status.HTTP_200_OK)


############################## Doctor ##############################

@api_view(['GET', 'POST'])
def all_doctor(request):
    if request.method == 'GET':
        all_doctor = Doctor.objects.all()
        doctor_ser = DoctorSerializer(all_doctor,many=True)
        return Response(doctor_ser.data)
    elif request.method == 'POST':
        add_doctor_ser = DoctorSerializer(data=request.data)
        if add_doctor_ser.is_valid():
            add_doctor_ser.save()
            response_data = add_doctor_ser.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(add_doctor_ser.errors, status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['GET', 'PUT', 'DELETE'])
def one_doctor(request, id):
    one_doctor = Doctor.objects.all().get(pk=id)
    if request.method == 'GET':
        one_doctor_Ser = DoctorSerializer(one_doctor, many=False)
        return Response(one_doctor_Ser .data)
    elif request.method == 'PUT':
        one_ser = DoctorSerializer(data=request.data, instance=one_doctor, partial=True)
        if one_ser.is_valid():
            one_ser.save()
            return Response(one_ser.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    elif request.method == 'DELETE':
        one_doctor.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    


########################## Tourism Places ##########################

@api_view(['GET', 'POST'])
def all_places(request):
    if request.method == 'GET':
        all_places = TourismPlaces.get_all_places()
        places_serializer = PlacesSerializer(all_places, many=True)
        return Response(places_serializer.data)
    elif request.method == 'POST':
        places_serializer = PlacesSerializer(data=request.data)
        if places_serializer.is_valid():
            places_serializer.save()
            response_data = places_serializer.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(places_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
def oneTourismPlace(request, id):
    one_Place = TourismPlaces.get_specific_place(id)
    if request.method == 'GET':
        one_place_serilize = PlacesSerializer(one_Place, many=False)
        return Response(one_place_serilize.data)
    elif request.method == 'PUT':
        one_place_ser = PlacesSerializer(
            data=request.data, instance=one_Place,partial=True)
        if one_place_ser.is_valid():
            one_place_ser.save()
            return Response(one_place_ser.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE':
        one_Place.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
#####################################
########################################## Search Section #########################################
@api_view(['POST'])
def Search_Places(request):
    name = request.data.get('name')
    tourism_company_od = request.data.get('id')

    # Check if the treatment center exists
    try:
        tourism_company = TourismCompany.objects.get(pk=tourism_company_od)
    except TourismCompany.DoesNotExist:
        return Response({'error': 'Tourism company  not found'}, status=status.HTTP_404_NOT_FOUND)

    places = TourismPlaces.objects.filter(name__icontains=name, tourismCompany=tourism_company_od)
    serilazed_places = PlacesSerializer(places, many=True).data
    return Response({'places': serilazed_places, 'length': len(serilazed_places)}, status=status.HTTP_200_OK)


@api_view(['POST'])
def Search_Doctors(request):
    name = request.data.get('name')
    treatment_center_id = request.data.get('id')

    # Check if the treatment center exists
    try:
        treatment_center = Tretment_center.objects.get(pk=treatment_center_id)
    except Tretment_center.DoesNotExist:
        return Response({'error': 'Treatment center not found'}, status=status.HTTP_404_NOT_FOUND)

    doctors = Doctor.objects.filter(name__icontains=name, treatment_center=treatment_center_id)
    serialized_doctors = DoctorSerializer(doctors, many=True).data
    return Response({'doctors': serialized_doctors, 'length': len(serialized_doctors)}, status=status.HTTP_200_OK)
@api_view(['POST'])
def Search_Treatments(request):
    name = request.data.get('name')
    speicilization=request.data.get('speicilization')
    # Check if the treatment center exists
    try:
        hair_treatments=Tretment_center.objects.filter(name__icontains=name,specialization=speicilization)
    except Tretment_center.DoesNotExist:
        return Response({'error': 'No  Treatment center with this name found'}, status=status.HTTP_404_NOT_FOUND)

    serialized_treatments = Tretment_CenterSerializer(hair_treatments, many=True).data
    return Response({'treatments': serialized_treatments, 'length': len(serialized_treatments)}, status=status.HTTP_200_OK)

@api_view(['POST'])
def Search_Tourism_Companies(request):
    name = request.data.get('name')
    # Check if the treatment center exists
    try:
        tourism_companies=TourismCompany.objects.filter(name__icontains=name)
    except Tretment_center.DoesNotExist:
        return Response({'error': 'No  Tourism Company with this name found'}, status=status.HTTP_404_NOT_FOUND)

    serialized_companies = CompanySerializer(tourism_companies, many=True).data
    return Response({'companies': serialized_companies, 'length': len(serialized_companies)}, status=status.HTTP_200_OK)
###############################################################################################################################

@api_view(['POST'])
def Get_Treatment_Center_Doctors(request):
    treatment_center_id = request.data.get('id')
    try:
        treatment_center = Tretment_center.objects.get(pk=treatment_center_id)
    except Tretment_center.DoesNotExist:
        return Response({'error': 'No treatment center found'}, status=status.HTTP_404_NOT_FOUND)

    doctors = Doctor.objects.filter(treatment_center=treatment_center_id)
    serializer = DoctorSerializer(doctors, many=True)

    return Response({'doctors': serializer.data, 'length': len(serializer.data)}, status=status.HTTP_200_OK)

@api_view(['POST'])
def Get_Treatment_Center_Reservations(request):
    treatment_center_id = request.data.get('id')
    try:
        treatment_center = Tretment_center.objects.get(pk=treatment_center_id)
    except Tretment_center.DoesNotExist:
        return Response({'error': 'No treatment center found'}, status=status.HTTP_404_NOT_FOUND)

    reservations = MedicalReservation.objects.filter(treatment_center=treatment_center_id)
    serializer = MedicalReservationSerializer(reservations, many=True)

    return Response({'reservations': serializer.data}, status=status.HTTP_200_OK)


############################# Website Users ############################################ changes ###########
@api_view(['GET', 'POST'])
def all_users(request):
    if request.method == 'GET':
        all_users = WebsiteUsers.objects.all()
        users_serializer = UsersSerializer(all_users, many=True)
        return Response(users_serializer.data)
    
    elif request.method == 'POST':
        user_serializer = UsersSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            activation = Activation.objects.create(
                user=user,
                expires_at=timezone.now() + timedelta(hours=168)
            )
            activation_url = request.build_absolute_uri(
                reverse('activate', args=[str(activation.token)])
            )
            send_mail(
                'Activate your account',
                f'Please click the link below to activate your account:\n{activation_url}',
                'noreply@example.com',
                [user.Email],
                fail_silently=False,
            )
            response_data = user_serializer.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def activate(request, token):
    activation = get_object_or_404(Activation, token=token)

    if activation.is_expired():
        activation.delete()
        return HttpResponse("Activation link has expired")
    else:
        user = activation.user
        user.is_active = True
        user.save()
        activation.delete()
        return redirect('http://localhost:3000/signin')

##################3 end of changes

@api_view(['GET', 'PUT', 'DELETE'])
def one_user(request, id):
    one_user = WebsiteUsers.objects.all().get(pk=id)
    if request.method == 'GET':
        ONe_User_Ser = UsersSerializer(one_user, many=False)
        return Response(ONe_User_Ser.data)
    elif request.method == 'PUT':
        one_ser = UsersSerializer(
            data=request.data, instance=one_user, partial=True)
        if one_ser.is_valid():
            one_ser.save()
            payload = {
                    'user_id': one_user.pk,
                    'email': one_user.Email,
                    'first_name': one_user.FullName,
                    'role':one_user.role,
                    'Password' : one_user.Password,
                    'age' : one_user.age,
                }
                
            token = jwt.encode(payload, 'secret_key', algorithm='HS256')
            response_data = {
                'user': one_ser.data,
                'token': token
            }

            return Response(response_data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE':
        
        one_user.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    
    

    
##################### generate jwt token which carries the information of the user login ##########################

@api_view(['POST'])
def loGin(request):
    email = request.data.get('Email')
    password = request.data.get('Password')

    user = WebsiteUsers.objects.filter(Email=email).first()
    if not user or not user.Password == password:
        return Response({'error': 'Wrong email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    if not user.is_active:
        return Response({'error': 'Please activate your account'}, status=status.HTTP_401_UNAUTHORIZED)


    payload = {
        'user_id': user.id,
        'email': user.Email,
        'first_name': user.FullName,
        'role':user.role,
        'Password' : user.Password,
        'age' : user.age,
    }

    token = jwt.encode(payload, 'secret_key', algorithm='HS256')
    return Response({'success': 'Authentication successful', 'token': token}, status=status.HTTP_200_OK)


########################### Treatment Center ##########################
@api_view(['GET', 'POST'])
def all_TretmentCenter(request):
    if request.method == 'GET':
        specilization = request.GET.get('specilization')
        if specilization:
            filtered_treatment_center = Tretment_center.objects.filter(specialization=specilization,verfied_byadmin=True)
            ter_ser = Tretment_CenterSerializer(filtered_treatment_center, many=True)
            return Response(ter_ser.data)
        else:
            all_treatment_center= Tretment_center.objects.all()
            ter_ser = Tretment_CenterSerializer(all_treatment_center,many=True)
            return Response(ter_ser.data)
    elif request.method == 'POST':
        add_treatment_ser = Tretment_CenterSerializer(data=request.data)
        if add_treatment_ser.is_valid():
            add_treatment_ser.save()
            response_data = add_treatment_ser.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(add_treatment_ser.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET', 'PUT', 'DELETE'])
def one_TretmentCenter(request, id):
    one_treatment = Tretment_center.objects.all().get(pk=id)
    if request.method == 'GET':
        one_treatment_Ser = Tretment_CenterSerializer(one_treatment, many=False)
        return Response(one_treatment_Ser .data)
    elif request.method == 'PUT':
        one_ser = Tretment_CenterSerializer(data=request.data, instance=one_treatment, partial=True)
        if one_ser.is_valid():
            one_ser.save()
            return Response(one_ser.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE':
        one_treatment.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    
@api_view(['GET', 'PUT', 'DELETE'])
def one_TretmentCenter_emaill(request, email):
    one_treatment = Tretment_center.objects.all().get(email=email)
    if request.method == 'GET':
        one_treatment_Ser = Tretment_CenterSerializer(one_treatment, many=False)
        return Response(one_treatment_Ser .data)
    elif request.method == 'PUT':
        one_ser = Tretment_CenterSerializer(data=request.data, instance=one_treatment, partial=True)
        if one_ser.is_valid():
            one_ser.save()
            return Response(one_ser.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE':
        one_treatment.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


############################## Tourism Reservations #########################

@api_view(['GET', 'POST'])
def all_tourism_reservations(request):

    if request.method == 'GET':
        all_tourism_reservations = TourismReservation.objects.all()
        tour_rec_ser = TourismReservationSerializer(all_tourism_reservations, many=True)
        return Response(tour_rec_ser.data)
    elif request.method == 'POST':
        add_tourism_reservation = TourismReservationSerializer(data=request.data)
        if add_tourism_reservation.is_valid():
            add_tourism_reservation.save()
            response_data = add_tourism_reservation.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(add_tourism_reservation.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def one_tourism_reservation(request, id):

    one_tourism_res = get_object_or_404(TourismReservation, pk=id)
    if request.method == 'GET':
        one_tourism_res_ser = TourismReservationSerializer(one_tourism_res)
        return Response(one_tourism_res_ser.data)
    elif request.method == 'PUT':
        one_tourism_res_ser = TourismReservationSerializer(data=request.data, instance=one_tourism_res, partial=True)
        if one_tourism_res_ser.is_valid():
            one_tourism_res_ser.save()
            return Response(one_tourism_res_ser.data)
        else:
            return Response(one_tourism_res_ser.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        one_tourism_res.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
############################################ Medical Reservations #############################

@api_view(['GET', 'POST'])
def all_medical_reservations(request):

    if request.method == 'GET':
        all_medical_reservations = MedicalReservation.objects.all()        
        medical_rec_ser = MedicalReservationSerializer(all_medical_reservations, many=True)
        return Response(medical_rec_ser.data)
    elif request.method == 'POST':
        add_medical_reservation = MedicalReservationSerializer(data=request.data)
        if add_medical_reservation.is_valid():
            add_medical_reservation.save()
            response_data = add_medical_reservation.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(add_medical_reservation.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def one_medical_reservation(request, id):

    one_medical_res = get_object_or_404(MedicalReservation, pk=id)
    if request.method == 'GET':
        one_medical_res_ser = MedicalReservationSerializer(one_medical_res)
        return Response(one_medical_res_ser.data)
    elif request.method == 'PUT':
        one_medical_res_ser = MedicalReservationSerializer(data=request.data, instance=one_medical_res, partial=True)
        if one_medical_res_ser.is_valid():
            one_medical_res_ser.save()
            return Response(one_medical_res_ser.data)
        else:
            return Response(one_medical_res_ser.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        one_medical_res.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

############################## medical_reservation_data fetch into profile #############################


@api_view(['POST'])
def medical_reservation_data(request):
    user = request.data.get('user')
    User = MedicalReservation.objects.filter(user=user)
    if not User:
        return Response({'error': 'Invalid user'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        serializer = MedicalReservationSerializer(User, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
############################## tourism_reservation_data fetch into profile #############################


@api_view(['POST'])
def tourism_reservation_data(request):
    user = request.data.get('user')
    User = TourismReservation.objects.filter(user=user)
    if not User:
        return Response({'error': 'Invalid user'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        serializer = TourismReservationSerializer(User, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['DELETE'])
def delete_doctor(request, doctor_id):
    doctor = get_object_or_404(Doctor, id=doctor_id)
    if MedicalReservation.objects.filter(doctor=doctor, status__in=["Pending Aprroval", "Accepted"]).exists():
        return Response(status=status.HTTP_400_BAD_REQUEST)
    doctor.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_tourism(request, place_id):
    place = get_object_or_404(TourismPlaces, id=place_id)

    if TourismReservation.objects.filter(tourism_places=place, status__in=["Pending Aprroval", "Accepted"]).exists():
        print("hi")
        return Response(status=status.HTTP_400_BAD_REQUEST)
        # return ({'error': 'Doctor has reservations and cannot be deleted.'})
    place.delete()
    return Response(status=status.HTTP_200_OK)



################################### Rating#######################################
@api_view(['POST'])
def treatment_center_Rate(request):
    user_id = request.data.get('user_id')
    treatment_center_id = request.data.get('treatment_center_id')
    user_rate = request.data.get('user_rate')
    try: 
        treatment_center = Tretment_center.objects.get(pk=treatment_center_id)
    except:
        return Response({'error': 'No treatment center found'}, status=status.HTTP_404_NOT_FOUND)

    # Convert user_rate string to a Decimal object
    user_rate_decimal = Decimal(user_rate)
    
    # Calculate new rating
    current_rating = treatment_center.rating or Decimal('0.0')
    num_ratings = Treatment_Center_Rating.objects.filter(treatment_center=treatment_center).count()
    new_rating = (current_rating * Decimal(num_ratings) + user_rate_decimal) / Decimal(num_ratings + 1)
    
    # Update treatment center rating
    treatment_center.rating = new_rating
    treatment_center.save()
    
    # Create new rating object
    rating = Treatment_Center_Rating.objects.create(
        treatment_center=treatment_center,
        rating=user_rate_decimal,
        user_id=user_id
    )
    
    return Response({'success': 'Rating submitted successfully.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def tourism_company_Rate(request):
    user_id = request.data.get('user_id')
    tourism_company_id = request.data.get('tourism_company_id')
    user_rate = request.data.get('user_rate')
    try: 
        tourism_company = TourismCompany.objects.get(pk=tourism_company_id)
    except:
        return Response({'error': 'No treatment center found'}, status=status.HTTP_404_NOT_FOUND)

    # Convert user_rate string to a Decimal object
    user_rate_decimal = Decimal(user_rate)
    
    # Calculate new rating
    current_rating = tourism_company.rating or Decimal('0.0')
    num_ratings = Tourism_Company_Rating.objects.filter(treatment_center=tourism_company).count()
    new_rating = (current_rating * Decimal(num_ratings) + user_rate_decimal) / Decimal(num_ratings + 1)
    
    # Update treatment center rating
    tourism_company.rating = new_rating
    tourism_company.save()
    
    # Create new rating object
    rating = Tourism_Company_Rating.objects.create(
        treatment_center=tourism_company,
        rating=user_rate_decimal,
        user_id=user_id
    )
    
    return Response({'success': 'Rating submitted successfully.'}, status=status.HTTP_200_OK)



@api_view(['POST'])
def CEHCKING_Rating(request):
    user_id = request.data.get('user_id')
    treatment_center_id = request.data.get('treatment_center_id')
    rated_by_this_user=Treatment_Center_Rating.objects.filter(user=user_id, treatment_center=treatment_center_id)
    if rated_by_this_user:
        return Response({'status':'rated'}, status=status.HTTP_200_OK)
    else:

        return Response({'status':'notrated'}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def CEHCKING_Rating_Tourism(request):
    user_id = request.data.get('user_id')
    tourism_company_id = request.data.get('tourism_company_id')
    rated_by_this_user=Tourism_Company_Rating.objects.filter(user=user_id, treatment_center=tourism_company_id)
    if rated_by_this_user:
        return Response({'status':'rated'}, status=status.HTTP_200_OK)
    else:

        return Response({'status':'notrated'}, status=status.HTTP_200_OK)



#################################################################################

@api_view(['GET', 'POST'])
def all_medical_reservations_book(request):

    if request.method == 'GET':
        all_medical_reservations = MedicalReservation.objects.all()        
        medical_rec_ser = MedicalReservationsSerializer(all_medical_reservations, many=True)
        return Response(medical_rec_ser.data)
    elif request.method == 'POST':
        add_medical_reservation = MedicalReservationsSerializer(data=request.data)
        if add_medical_reservation.is_valid():
            add_medical_reservation.save()
            response_data = add_medical_reservation.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(add_medical_reservation.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def all_tourism_reservations_book(request):

    if request.method == 'GET':
        all_tourism_reservations = TourismReservation.objects.all()
        tour_rec_ser = TourismReservationsSerializer(all_tourism_reservations, many=True)
        return Response(tour_rec_ser.data)
    elif request.method == 'POST':
        add_tourism_reservation = TourismReservationsSerializer(data=request.data)
        if add_tourism_reservation.is_valid():
            add_tourism_reservation.save()
            response_data = add_tourism_reservation.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(add_tourism_reservation.errors, status=status.HTTP_400_BAD_REQUEST)
        



        #######################

@api_view(['POST'])
def checking_book_medical(request):
    user_id=request.data.get('user_id')
    doctor_id=request.data.get('doctor_id')
    treatement_cetner_id=request.data.get('treatment_center_id')
  
    try:
        treatment_center=Tretment_center.objects.get(pk=treatement_cetner_id)
    except:
        return Response({'error': 'No treatment center found'}, status=status.HTTP_404_NOT_FOUND)
    user_booked_this_doctor=MedicalReservation.objects.filter(user=user_id,treatment_center=treatement_cetner_id,doctor=doctor_id)
    if user_booked_this_doctor:
    
        return Response({'bookingstatus':"booked"} ,status=status.HTTP_200_OK)
    else:
        return Response({'bookingstatus':"notbooked"} ,status=status.HTTP_200_OK)
    


@api_view(['POST'])
def checking_book_tourism(request):
    user_id=request.data.get('user_id')
    tourism_places_id=request.data.get('tourism_places_id')
    tourism_company_id=request.data.get('tourism_company_id')
  
    try:
        tourism_company=TourismCompany.objects.get(pk=tourism_company_id)
    except:
        return Response({'error': 'No tourism company found'}, status=status.HTTP_404_NOT_FOUND)
    user_booked_this_place=TourismReservation.objects.filter(user=user_id,tourism_company=tourism_company_id,tourism_places=tourism_places_id)
    if user_booked_this_place:
        return Response({'bookingstatus':"booked"} ,status=status.HTTP_200_OK)
    else:
        return Response({'bookingstatus':"notbooked"} ,status=status.HTTP_200_OK)

from django.views.decorators.csrf import csrf_exempt

###################################emailing#########################
@csrf_exempt
@api_view(['POST'])
def sending_email_accept(request):
    body=request.data.get('body')
    user_email=request.data.get('user_email')
    status=request.data.get('status')
    start_date=request.data.get('start_date')
    end_date=request.data.get('end_date')
    if body:
            send_mail(
                'Accept Reservation Message',
                f'Your reservation has been {status} \n with startdate : {start_date} \n enddate : {end_date} \n notes : {body}    ',
                'noreply@example.com',
                [user_email],
                fail_silently=False,
            )
    else:
        send_mail(
                'Accept Reservation Message',
                f'Your reservation has been {status} , with startdate : {start_date} , enddate : {end_date} ',
                'noreply@example.com',
                [user_email],
                fail_silently=False,
            )




    return Response({'email':"sent"} )




@csrf_exempt
@api_view(['POST'])
def sending_email_reject(request):
    body=request.data.get('body')
    user_email=request.data.get('user_email')
    status=request.data.get('status')
    start_date=request.data.get('start_date')
    end_date=request.data.get('end_date')
 
    if body:
            send_mail(
                'Reject Reservation Message',
                f' We are sorry to infrom you that  your reservation with \n start Date : {start_date} and \n end Date : {end_date}  \n  has been {status} \n notes : {body}    ',
                'noreply@example.com',
                [user_email],
                fail_silently=False,
            )
    else:
        send_mail(
                'Reject Reservation Message',
                f'We are sorry to infrom you that  your reservation with \n start Date : {start_date} and \n end Date : {end_date}  \n  has been {status}',
                'noreply@example.com',
                [user_email],
                fail_silently=False,
            )




    return Response({'email':"sent"} )






######################################################### Feedback #####################################
################################## feedback #######################################


@api_view(['POST'])
def treatment_center_feedback(request):
    user_id = request.data.get('user_id')
    treatment_center_id = request.data.get('treatment_center_id')
    feedback = request.data.get('feedback')
    try: 
        treatment_center = Tretment_center.objects.get(pk=treatment_center_id)
    except:
        return Response({'error': 'No treatment center found'}, status=status.HTTP_404_NOT_FOUND)

    
    feedback_obj = Treatment_Center_Feedback.objects.create(
        treatment_center_id=treatment_center_id,
        user_id=user_id,
        feedback=feedback
    )
    return Response({'success': 'feedback submitted successfully.',}, status=status.HTTP_200_OK)




################################### check feedback #######################################

@api_view(['POST'])
def checking_feedback(request):
    user_id = request.data.get('user_id')
    treatment_center_id = request.data.get('treatment_center_id')
    feedback_by_this_user=Treatment_Center_Feedback.objects.filter(user=user_id, treatment_center=treatment_center_id)
    if feedback_by_this_user:
        return Response({'status':'feedbackdone'}, status=status.HTTP_200_OK)
    else:
        return Response({'status':'notfeedback'}, status=status.HTTP_200_OK)
    


@api_view(['POST'])
def all_feedback(request):
    treatment_center_id = request.data.get('user_id')
    try:
        treatment_center = Tretment_center.objects.get(pk=treatment_center_id)
    except Tretment_center.DoesNotExist:
        return Response({'error': 'Treatment center not found'}, status=status.HTTP_404_NOT_FOUND)
    
    feedbacks = Treatment_Center_Feedback.objects.filter(treatment_center=treatment_center_id)
    serializer = feedbackSerializer(feedbacks, many=True)
    

    return Response({'feedbacks':serializer.data, }, status=status.HTTP_200_OK)


################################### tourism_company feedback #######################################


@api_view(['POST'])
def tourism_company_feedback(request):
    user_id = request.data.get('user_id')
    tourism_company_id = request.data.get('tourism_company_id')
    feedback = request.data.get('feedback')
    try: 
        tourism_company = TourismCompany.objects.get(pk=tourism_company_id)
    except:
        return Response({'error': 'No treatment center found'}, status=status.HTTP_404_NOT_FOUND)

    feedback_obj = Tourism_Company_Feedback.objects.create(
        tourism_company_id=tourism_company_id,
        user_id=user_id,
        feedback=feedback
    )
    return Response({'success': 'feedback submitted successfully.',}, status=status.HTTP_200_OK)


################################### tourism_company check feedback #######################################

@api_view(['POST'])
def checking_feedback_tourism_company(request):
    user_id = request.data.get('user_id')
    tourism_company_id = request.data.get('tourism_company_id')
    feedback_by_this_user=Tourism_Company_Feedback.objects.filter(user=user_id, tourism_company=tourism_company_id)
    if feedback_by_this_user:
        return Response({'status':'feedbackdone'}, status=status.HTTP_200_OK)
    else:
        return Response({'status':'notfeedback'}, status=status.HTTP_200_OK)
    
    
################################### tourism_company all feedback #######################################


@api_view(['POST'])
def all_feedback_tourism_company(request):
    tourism_company_id = request.data.get('tourism_company_id')
    try:
        tourism_company = TourismCompany.objects.get(pk=tourism_company_id)
    except TourismCompany.DoesNotExist:
        return Response({'error': 'tourism company not found'}, status=status.HTTP_404_NOT_FOUND)
    
    feedbacks = Tourism_Company_Feedback.objects.filter(tourism_company=tourism_company_id)
    serializer = feedbackSerializer_tourism(feedbacks, many=True)
    

    return Response({'feedbacks':serializer.data, }, status=status.HTTP_200_OK)





############################ Filteration ############

@api_view(['POST'])
def filter_doctors(request):
    treatment_center_id=request.data.get('treatment_center')
    specialization=request.data.get('specialization')
    try :
        treatment_center=Tretment_center.objects.get(pk=treatment_center_id)
    except Tretment_center.DoesNotExist:
        return Response({'error': 'Treatment Center not found'}, status=status.HTTP_404_NOT_FOUND)
    if specialization == 'All':
        doctors = Doctor.objects.filter(treatment_center=treatment_center_id)
    else:
        doctors=Doctor.objects.filter(treatment_center=treatment_center_id,specialization=specialization)
    serilazer=DoctorSerializer(doctors,many=True)
    return Response({'doctors':serilazer.data},status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def payment_list(request):
    if request.method == 'GET':
        payments = Treatment_Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        treatment_center_id = request.data.get('treatment_center')
        user_id = request.data.get('user_id')
        payed = request.data.get('payed')
        try:
            treatment_center = Tretment_center.objects.get(id=treatment_center_id)
        except Tretment_center.DoesNotExist:
            return Response({"error": f"Treatment center with ID {treatment_center_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)

        try:
            user = WebsiteUsers.objects.get(id=user_id)
        except WebsiteUsers.DoesNotExist:
            return Response({"error": f"user with ID {user_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)

        payment = Treatment_Payment.objects.create(treatment_center=treatment_center, user_id=user, payed=payed)
        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@api_view(['POST'])
def get_payment(request):
    treatment_center_id = request.data.get('treatment_center')
    user_id = request.data.get('user_id')
    payed=Treatment_Payment.objects.filter(user_id=user_id, treatment_center=treatment_center_id)
    if payed:
        return Response({'isPaid':'True'}, status=status.HTTP_200_OK)
    else:
        return Response({'isPaid':'False'}, status=status.HTTP_200_OK)
    
@api_view(['GET', 'POST'])
def tourism_payment_list(request):
    if request.method == 'GET':
        payments = Tourism_Payment.objects.all()
        serializer = TourismPaymentSerializer(payments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        treatment_center_id = request.data.get('tourism_company')
        user_id = request.data.get('user_id')
        payed = request.data.get('payed')
        print(treatment_center_id)
        try:
            tourism_center = TourismCompany.objects.get(pk=treatment_center_id)
        except TourismCompany.DoesNotExist:
            return Response({"error": f"Treatment center with ID {treatment_center_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)

        try:
            user = WebsiteUsers.objects.get(id=user_id)
        except WebsiteUsers.DoesNotExist:
            return Response({"error": f"user with ID {user_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)

        payment = Tourism_Payment.objects.create(tourism_company_id=treatment_center_id, user_id=user, payed=payed)
        serializer = TourismPaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@api_view(['POST'])
def get_payment_tourism(request):
    treatment_center_id = request.data.get('tourism_company')
    user_id = request.data.get('user_id')
    payed = Tourism_Payment.objects.filter( tourism_company_id=treatment_center_id,user_id=user_id)
    if payed:
        return Response({'isPaidTourism':'True'}, status=status.HTTP_200_OK)
    else:
        return Response({'isPaidTourism':'False'}, status=status.HTTP_200_OK)



# /////////////////////////////////// reply to feedback

@csrf_exempt
@api_view(['POST'])
def reply_feedback_treatment(request):
    body=request.data.get('body')
    user_email=request.data.get('user_email')
    feedback=request.data.get('feedback')
    treatment_center_id=request.data.get('treatment_center_id')
    feedback_user=request.data.get('feedback_user')
    user_id=request.data.get('user_id')
    print(request)

    try :
        treatment_feedback=Treatment_Center_Feedback.objects.get(treatment_center=treatment_center_id,user=user_id)
    except:
        return Response({"No treatment_feedback found"}, status=status.HTTP_404_NOT_FOUND)
    treatment_feedback.isreplied=True
    treatment_feedback.save()

   
    send_mail(
                'Feedback reply ',
                f' Dear {feedback_user} \n we have received your feedback : {feedback}  \n and we are glad to get your feedback , \n so we {body}  ',
                'noreply@example.com',
                [user_email],
                fail_silently=False,
            )
    return Response({'email':"sent"} )



@api_view(['POST'])
def get_one_treatment_feedback(request):
    feedback_id=request.data.get('feedback_id')
    try:
        feedback=Treatment_Center_Feedback.objects.get(pk=feedback_id)
    except:
        return Response({"No feedback found"}, status=status.HTTP_404_NOT_FOUND)
    one_feedback_ser = feedbackSerializer(feedback)
    return Response(one_feedback_ser.data)




@csrf_exempt
@api_view(['POST'])
def reply_feedback_tourism(request):
    body=request.data.get('body')
    user_email=request.data.get('user_email')
    feedback=request.data.get('feedback')
    tourism_company_id=request.data.get('tourism_company_id')
    feedback_user=request.data.get('feedback_user')
    user_id=request.data.get('user_id')

    try :
        tourism_feedback=Tourism_Company_Feedback.objects.get(tourism_company=tourism_company_id,user=user_id)
    except:
        return Response({"No tourism_feedback found"}, status=status.HTTP_404_NOT_FOUND)
    tourism_feedback.isreplied=True
    tourism_feedback.save()

   
    send_mail(
                'Feedback reply ',
                f' Dear {feedback_user} \n we have received your feedback : {feedback}  \n and we are glad to get your feedback , \n so we {body}  ',
                'noreply@example.com',
                [user_email],
                fail_silently=False,
            )
    return Response({'email':"sent"} )



@api_view(['POST'])
def get_one_tourism_feedback(request):
    feedback_id=request.data.get('feedback_id')
    try:
        feedback=Tourism_Company_Feedback.objects.get(pk=feedback_id)
    except:
        return Response({"No feedback found"}, status=status.HTTP_404_NOT_FOUND)
    one_feedback_ser = feedbackSerializer_tourism(feedback)
    return Response(one_feedback_ser.data)