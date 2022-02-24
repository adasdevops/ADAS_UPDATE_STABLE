from django.urls import path

from cvat.apps.lttschanges.reports.views import ProjectReport,TaskReport


urlpatterns = [
    path('project_report', ProjectReport.as_view(), name='project_report'),
    path('task_report', TaskReport.as_view(), name='task_report'),
]