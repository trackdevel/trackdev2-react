import * as React from "react"
import {useEffect} from "react"
import {Card, CardContent, CardHeader} from "../../registry/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "../../registry/ui/avatar";
import {Separator} from "../../registry/ui/separator";
import Api from "../../utils/Api";
import {z} from "zod";
import {taskCommentSchema} from "../data/task/comment";


var HistoryTexts = {
    'rank_change': 'Rank',
    'status_change': 'Estat',
    'assignee_change': 'Usuari Asignat',
    'priority_change': 'Prioritat',
    'description_change': 'Descripció',
    'title_change': 'Títol',
    'project_change': 'Projecte',
    'active_sprints_change': 'Sprints Actius',
    'estimation_points_change': 'Estimació de punts',
    'name_change': 'Nom',
}

export function TaskHistory( ...props: any ) {
  const [taskId, setTaskId] = React.useState<any>(props[0].taskId)
  const [history, setHistory] = React.useState<any>([])

  useEffect(() => {
    Api.get('/tasks/' + taskId + '/history').then((res) => {
      setHistory(z.array(taskCommentSchema).parse(res))
    }).catch((err) => {})
  }, []);


    return (
    <Card>
      <CardHeader className="flex flex-row items-center">
      </CardHeader>
      <CardContent>
        <div className="flex h-full flex-col space-y-4">
          <div className="space-y-8">
            {history.map((item : any, index : any) => (
              <>
                <div className="flex items-center">
                  {/*<Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>{item.author.username}</AvatarFallback>
                  </Avatar>*/}
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        {
                            // @ts-ignore
                            (HistoryTexts[item.type]) ? HistoryTexts[item.type] : item.type
                        }
                    </p>
                    <p className="text-sm text-muted-foreground">{item.author}</p>
                  </div>
                  <div className="ml-auto font-medium">{item.oldValue} {(item.oldValue) ? '>' : ''} {item.newValue}</div>
                </div>
                {index !== history.length - 1 && (
                  <Separator />
                )}
              </>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
