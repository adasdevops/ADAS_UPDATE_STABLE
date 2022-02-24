import csv
import xlwt
from django.template.loader import get_template
from django.http import HttpResponse
from io import BytesIO
from xhtml2pdf import pisa

def convert_to_csv(columns_title,data,file_name):
    response = HttpResponse(content_type='text/csv')
    writer = csv.writer(response)
    writer.writerow(columns_title)
    for row in data:
        writer.writerow(row)
    response['Content-Disposition'] = 'attachment; filename={}'.format(file_name)
    return response


def convert_to_excel(columns_title,data,sheet_name,file_name):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename={}'.format(file_name)
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet(sheet_name)

    # Sheet header, first row
    row_num = 0

    font_style = xlwt.XFStyle()
    font_style.font.bold = True

    for col_num in range(len(columns_title)):
        ws.write(row_num, col_num, columns_title[col_num], font_style)

    font_style = xlwt.XFStyle()

    for row in data:
        row_num += 1
        for col_num in range(len(row)):
            ws.write(row_num, col_num, row[col_num], font_style)

    wb.save(response)
    return response


def render_to_pdf(template_src, context_dict={}):
     template = get_template(template_src)
     html  = template.render(context_dict)
     result = BytesIO()

     #This part will create the pdf.
     pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
     if not pdf.err:
         return HttpResponse(result.getvalue(), content_type='application/pdf')
     return None

