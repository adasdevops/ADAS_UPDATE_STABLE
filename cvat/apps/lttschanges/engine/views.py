
from email.mime.multipart import MIMEMultipart
from django.contrib.auth.models import User
from email.mime.text import MIMEText
import smtplib, ssl
import json
from cvat.settings.development import EMAIL_HOST_USER, EMAIL_HOST_PASSWORD
from cvat.apps.engine.models import Job, Segment
from cvat.apps.lttschanges.engine.templates.email_template import admin_annot, annot_review


def send_email_on_job_assignment(self):
    if not self.email_sent:
        print("emailsentmethod")
        assignee_id = json.loads(self.request.body).get('assignee_id',False)
        reviewer_id = json.loads(self.request.body).get('reviewer_id',False)
        print("emailsentmethod", assignee_id)
        msg = MIMEMultipart('alternative')
        msg['From'] = EMAIL_HOST_USER
        mess = ''
        job_id = self.kwargs['pk']
        segment_id = Job.objects.filter(id=job_id).values('segment_id')[0].get('segment_id')
        task_id =Segment.objects.filter(id=segment_id).values('task_id')[0].get('task_id')
    
        if assignee_id:
            print("inside assigneeid")
            assignee_queryset = User.objects.filter(id=assignee_id).values()[0]
            assignee_email, assignee_username = assignee_queryset.get('email'),assignee_queryset.get('username')
            msg['Subject'] = "Job assignment notification"
            msg['To'] = assignee_email
            mess = admin_annot.format(assignee_username,task_id, job_id)
        
        elif reviewer_id:
            reviewer_queryset = User.objects.filter(id=reviewer_id).values()[0]
            reviewer_email, reviewer_username = reviewer_queryset.get('email'),reviewer_queryset.get('username')
            msg['Subject'] = "Job Review notification"
            msg['To'] = reviewer_email
            mess = annot_review.format(reviewer_username,task_id,job_id)
        
        part = MIMEText(mess, 'html')
        msg.attach(part)
        port = 465 
        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
            server.login(EMAIL_HOST_USER,EMAIL_HOST_PASSWORD)
            if msg.get('To') is not None:
                server.sendmail(EMAIL_HOST_USER, msg.get('To'), msg.as_string())
                server.quit()
        self.email_sent = True
        return self.email_sent

    