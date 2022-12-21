-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_publisherId_fkey";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
