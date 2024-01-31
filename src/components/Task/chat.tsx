import * as React from "react"
import {useEffect} from "react"
import {Send} from "lucide-react"
import {Card, CardContent, CardFooter, CardHeader} from "../../registry/ui/card";
import {Button} from "../ui/button";
import {cn} from "../../lib/utils";
import {Input} from "../../registry/ui/input";
import Api from "../../utils/Api";
import {z} from "zod";
import {taskCommentSchema} from "../data/task/comment";
import {toast} from "react-toastify";

export function CardsChat( ...props: any ) {
  const [currentUser, setCurrentUser] = React.useState<string>('1')

  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length

  const [messages, setMessages] = React.useState<any>([])
  const [messagesloaded, setMessagesloaded] = React.useState<boolean>(false)

  const [taskId, setTaskId] = React.useState<any>(props[0].taskId)


  useEffect(() => {
    Api.get('/auth/self').then((res) => {
      setCurrentUser(res.id)
    }).catch((err) => {})
    return;
  }, [])

  function newMessage(event: React.SyntheticEvent) {
    event.preventDefault()
    if (inputLength === 0) return

    var requestBody = { comment: { content: input } }

    Api.patch('/tasks/' + taskId, requestBody).then((res) => {
      getMessages(taskId)
      setInput("")
      toast.success('Comentari enviat', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }).catch((err) => {
    })
  }



  useEffect(() => {
    getMessages(taskId)
  }, [])
  async function getMessages(taskId: string|undefined) {
    Api.get('/tasks/' + taskId + '/comments').then((res) => {
      setMessages(z.array(taskCommentSchema).parse(res))
    }).catch((err) => {})
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.length === 0 && (
                <div className="flex justify-center items-center h-32">
                    <p className="text-muted">No hi ha comentaris</p>
                </div>
                )
            }
            {messages.map((message : any, index : any) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    message.author.id == currentUser
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                  <h1>{message.author.username}</h1>
                  <p className="m-0">{message.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Input
              id="message"
              placeholder="Escriu el seu comentari"
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0} onClick={newMessage}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
