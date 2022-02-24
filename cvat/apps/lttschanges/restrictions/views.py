#from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from cvat.apps.lttschanges.restrictions.serializers import AgreementStatusSerializer
from cvat.apps.restrictions.models import UserAgreementStatus
from drf_spectacular.utils import OpenApiResponse, extend_schema



class RestrictionsViewSet(viewsets.ViewSet):
    serializer_class = None
    permission_classes = [IsAuthenticated]
    # authentication_classes = []

    # To get nice documentation about ServerViewSet actions it is necessary
    # to implement the method. By default, ViewSet doesn't provide it.
    def get_serializer(self, *args, **kwargs):
        pass


    @staticmethod
    @extend_schema(summary='Method provides user agreements that the user must accept to register',
                  responses={'200': AgreementStatusSerializer},
                  tags=['restrictions'], versions=['2.0'])
    @action(detail=False, methods=['PATCH'], serializer_class=AgreementStatusSerializer)
    def user_agreements(request):
        try:
            user_id = request.user.id
            print("user details",user_id)
            agreement = UserAgreementStatus.objects.get(user_id=user_id)
            # user_agreements = settings.RESTRICTIONS['user_agreements']
            # print("chekcing user_agreements", user_agreements)
            serializer = AgreementStatusSerializer(agreement, data=request.data)
            if serializer.is_valid():
                serializer.save() 
                return Response(data=serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST) 