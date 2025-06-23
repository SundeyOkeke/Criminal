import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { AuthService } from 'src/user/auth.service';
import { CreateReportDto } from 'src/user/dto/user.dto';


@WebSocketGateway({
  cors: {
    origin: '*', // Adjust as needed
  },
  perMessageDeflate: {
    threshold: 1024, // Compress messages > 1KB
    zlibDeflateOptions: {
      level: 3, // Compression level (1-9, lower = faster)
    },
  },
})
export class ChatGateway implements OnGatewayConnection {
  private readonly connectedUsers: Map<string, Socket> = new Map();

  @WebSocketServer()
  server: Server;

  constructor(private authService: AuthService) {}

  async handleConnection(socket: Socket) {
    try {
      const user = await this.authService.getUserFromSocket(socket);
      if (!user || !user.id) {
        // Disconnect the socket if there is no user
        socket.disconnect();
        return;
      }

      this.connectedUsers.set(user.id, socket);
      this.getcriminalReport(user.id)
      socket.emit("connected", "Connected")

    } catch (error) {
      console.error(error);
      throw new WsException('Error connecting');
    }
  }

  async handleDisconnect(socket: Socket) {
    try {
      // Handle disconnection here
      const user = await this.authService.getUserFromSocket(socket);
      if (user) {
        // Remove the user's socket from the connectedUsers map
        this.connectedUsers.delete(user.id);
      }
    } catch (error) {
      console.error(error);
      throw new WsException('Error disconnecting');
    }
  }


  async getcriminalReport(id: string) {
    const report = await this.authService.getcriminalReport(id)
    const socket = this.connectedUsers.get(id.toString());
    if (!socket) {
      console.log("Not active user")
      return null
    }
    console.log("Active user")
  socket.emit('report', report);
  return 
  }

  @SubscribeMessage('send_report')
  async handleClientChat(
    @ConnectedSocket() senderSocket: Socket,
    @MessageBody() data: CreateReportDto,
  ) {
    try {
      console.log("Going in")
      const senderUser =
        await this.authService.getUserFromSocket(senderSocket);
      const reports = await this.authService.criminalReport(data, senderUser.id)
      console.log("Im here")
      await Promise.all(
        reports.map((report) => {
          this.getcriminalReport(report._id)
        })
      )

    } catch (error) {
      console.error(error);
      throw new WsException('Error processing message');
    }
  }

}
