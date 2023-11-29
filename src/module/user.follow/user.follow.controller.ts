import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserFollowService } from './user.follow.service';
import { CreateUserFollowDto } from './dto/create-user.follow.dto';
import { UpdateUserFollowDto } from './dto/update-user.follow.dto';
import { RequestWithID } from 'src/common/interface/Request.type';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('user.follow')
export class UserFollowController {
  constructor(private readonly userFollowService: UserFollowService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createUserFollowDto: CreateUserFollowDto,
    @Req() req: RequestWithID,
  ) {
    return this.userFollowService.create(createUserFollowDto);
  }

  @Get('following/:id')
  getfollowing(@Param('id') id: number, @Req() req: RequestWithID) {
    return this.userFollowService.following(+id);
  }

  @Get('followers/:id')
  getfollowers(@Param('id') id: number, @Req() req: RequestWithID) {
    return this.userFollowService.followers(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserFollowDto: UpdateUserFollowDto,
  ) {
    return this.userFollowService.update(+id, updateUserFollowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFollowService.remove(+id);
  }
}
