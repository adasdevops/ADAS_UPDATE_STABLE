import rules
from cvat.apps.authentication.auth import AUTH_ROLE
from cvat.apps.engine.models import Task, Job , Segment

# AUTH PREDICATES
has_admin_role = rules.is_group_member(str(AUTH_ROLE.ADMIN))
has_user_role = rules.is_group_member(str(AUTH_ROLE.USER))
has_annotator_role = rules.is_group_member(str(AUTH_ROLE.ANNOTATOR))
has_observer_role = rules.is_group_member(str(AUTH_ROLE.OBSERVER))


class TaskGetQuerySetMixin(object):
    def get_queryset(self):
        #Ltts changes- for task filter
        # new code changes done for filtering tasks based on assignee id 
        userid = self.request.user.id
        user = self.request.user
        queryset = super().get_queryset()
        print("queryset")
        #k=Group.objects.filter(id=userid).values('name')
        if has_admin_role(user):
            data=Task.objects.filter().values()
            return queryset
        else:
            segment_id = Job.objects.filter(assignee_id=userid).values_list('segment_id')
            task_id =Segment.objects.filter(id__in=segment_id).values('task_id') 
            data = [x['task_id'] for x in task_id]  
            task_id_list = list(set(data))
            data=Task.objects.filter(id__in=task_id_list)
            print("dffffffffffffffffffff", data)
            return data	