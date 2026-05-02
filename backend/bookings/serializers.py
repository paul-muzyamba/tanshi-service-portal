from rest_framework import serializers
from .models import Booking
from services.serializers import ServiceSerializer

class BookingSerializer(serializers.ModelSerializer):
    service_detail = ServiceSerializer(source='service', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'client', 'service', 'service_detail',
            'status', 'booking_date', 'notes',
            'total_price', 'created_at'
        ]
        read_only_fields = ['id', 'client', 'created_at']

    def create(self, validated_data):
        request = self.context.get('request')
        booking = Booking.objects.create(
            client=request.user,
            **validated_data
        )
        return booking
