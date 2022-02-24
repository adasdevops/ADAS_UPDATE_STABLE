admin_annot = """\
        <html>
        <head></head>
        <body>
            <p>Hi <strong>{0}</strong> <br>
            Please check the job with id <strong>{2}</strong> for annotation. 
            Please click on url to annotate <a href="http://localhost:3000/tasks/{1}">tasks</a>
            
            <br>
            Thank you.
            
            
            
            <br>
            Regards,<br>
            Admin
            
            </p>
        </body>
        </html>
        """

annot_review = """\
        <html>
        <head></head>
        <body>
            <p>Hi <strong>{0}</strong> <br>
            Please review the assigned job id <strong>{2}</strong> <br>
            click on url to review assigned job <a href="http://localhost:3000/tasks/{1}">tasks</a>

            Thank you.
            
            <br>
            Regards,<br>
            Admin 
            
            </p>
        </body>
        </html>
        """