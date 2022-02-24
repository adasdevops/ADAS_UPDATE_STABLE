from rest_framework import serializers
from cvat.apps.restrictions.models import UserAgreementStatus




class AgreementStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserAgreementStatus
        fields = ('user_id',
                  'accepted_status',
                  'accepted_date',
                  'accepted_time')