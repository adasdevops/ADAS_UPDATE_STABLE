from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.views import APIView
from datetime import datetime

from cvat.apps.engine.models import (
    Job,  Task, Project, Segment
)

from .utils import convert_to_excel,convert_to_csv,render_to_pdf

class ProjectReport(APIView):
    """
    Project Report
    """

    def get(self, request, format=None):
        project_id = request.GET.get('project_id')
        format_to_convert = request.GET.get('format_to_convert')
        if not format_to_convert:
            format_to_convert = 'json'
        if not project_id:
                data = Project.objects.all().values('name', 'status','start_date')
                response = Response(data)
        else:

            if project_id == 'all':
                data = Project.objects.all().values_list('name', 'status','start_date')
            else:
                data = Project.objects.filter(id=project_id).values_list('name', 'status','start_date')
            list_data = [list(ele) for ele in data]

            for index in range(len(list_data)):
                list_data[index][2] = list_data[index][2].strftime("%d-%m-%Y")

            columns_list = ['Name', 'Status', 'Start Date']

            if format_to_convert == 'csv':
                response = convert_to_csv(columns_list,list_data,'project_report.csv')

            elif format_to_convert == 'excel':
                response = convert_to_excel(columns_list,list_data,'Projects','project_report.xls')

            if format_to_convert == 'pdf' or format_to_convert == 'json':
                dict_data_list = []
                dict_keys = ['name', 'status','start_date']
                for index in range(len(list_data)):
                    new_dict = {}
                    i = 0
                    for d in dict_keys:

                        new_dict[d] = list_data[index][i]
                        i = i+1
                    dict_data_list.append(new_dict)
                context = {}
                context['data']= dict_data_list
                context['columns'] = columns_list

                if format_to_convert == 'pdf':
                    pdf = render_to_pdf('html_templates/report_template.html',context_dict=context)
                    #rendering the template
                    response =  HttpResponse(pdf, content_type='application/pdf')

                elif format_to_convert == 'json':
                    response = Response(dict_data_list)

        return response


class TaskReport(APIView):
    """
    Task Report
    """
    def get(self, request, format=None):
        project_id = request.GET.get('project_id')
        # task_id = request.GET.get('task_id')
        format_to_convert = request.GET.get('format_to_convert')
        if not format_to_convert:
            format_to_convert = 'json'
        if not project_id :
            data = Task.objects.all().values('name', 'mode', 'status')
            response = Response(data)
        else:
            search_data = {}
            if project_id != 'all':
                search_data['project_id'] = project_id
            # if task_id and task_id != 'all':
            #     search_data['id'] = task_id
            if project_id == 'all' :
                data = Task.objects.all().values_list('name', 'mode', 'status')
            else:
                data = Task.objects.filter(**search_data).values_list('name', 'mode', 'status')

            columns_list = ['Name', 'Mode', 'Status']
            if format_to_convert == 'csv':
                response = convert_to_csv(columns_list,data,'task_report.csv')

            elif format_to_convert == 'excel':
                response = convert_to_excel(columns_list,data,'Tasks','task_report.xls')

            if format_to_convert == 'pdf' or format_to_convert == 'json':
                dict_data_list = []
                if project_id == 'all':
                    dict_data_list = Task.objects.all().values('name', 'mode', 'status')
                else:
                    dict_data_list = Task.objects.filter(**search_data).values('name', 'mode', 'status')

                if format_to_convert == 'pdf':
                    context = {}
                    context['data']= dict_data_list
                    context['columns'] = dict_data_list[0].keys()
                    pdf = render_to_pdf('html_templates/report_template.html',context_dict=context)
                    #rendering the template
                    response =  HttpResponse(pdf, content_type='application/pdf')

                elif format_to_convert == 'json':
                    response = Response(dict_data_list)

        return response

