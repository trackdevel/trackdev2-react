import * as React from "react"
import { Send } from "lucide-react"
import {Card, CardContent, CardFooter, CardHeader} from "../../registry/ui/card";
import {Button} from "../ui/button";
import {cn} from "../../lib/utils";
import {Input} from "../../registry/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "../../registry/ui/avatar";
import {Separator} from "../../registry/ui/separator";

export function CardsChat() {
  const [currentUser, setCurrentUser] = React.useState<string>('1')
  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length


  function newMessage(event: React.SyntheticEvent) {
    event.preventDefault()
    if (inputLength === 0) return

    // load to database
    // if success, then:

    setMessages([
      ...messages,
      {
        user: "1",
        username: "Marc Got",
        content: input,
      },
    ])
    setInput("")
  }

  const [messages, setMessages] = React.useState([
    {
      user: "2",
      username: "Gerard Rovellat",
      content: "Hi, how can I help you today?",
    },
    {
      user: "1",
      username: "Marc Got",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      user: "2",
      username: "Gerard Rovellat",
      content: "What seems to be the problem?",
    },
    {
      user: "1",
      username: "Marc Got",
      content: "I can't log in.",
    },
  ])

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.user === currentUser
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                  <h1>{message.username}</h1>
                  <p className="m-0">{message.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Input
              id="message"
              placeholder="Type your message..."
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
