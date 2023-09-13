import { FileVideo, Github, Upload, Wand2 } from "lucide-react"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Separator } from "./components/ui/separator"
import { Slider } from "./components/ui/slider"
import { Textarea } from "./components/ui/textarea"

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-between border-b">
        
        <h1 className="text-xl font-semibold">upload.ai</h1>

        <div className="flex items-center gap-3">

          <span className="text-sm text-muted-foreground">Development AI</span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant='outline' size='sm'>
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>

        
      </header>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-3">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-5 leading-relaxed"
              placeholder="Inclua aqui o prompt para a IA..."
            />
            <Textarea
              className="resize-none p-5 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionao o conteúdo da transição do vídeo selecionado.
          </p>
        </div>

        <aside className="w-80 space-y-6">
          <form className="space-y-6">
            <label
              htmlFor="video"
              className="cursor-pointer border flex rounded-md aspect-video border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
            >
              <FileVideo className="w-4 h-4" />
              Selecione um vídeo
            </label>

            <input type="file" className="sr-only" id="video" accept="video/mp4" />

            <Separator />

            <div className="space-y-2">

              <Label htmlFor="transcription_prompt">Prompt de transcrição:</Label>

              <Textarea
                id='transcription_prompt'
                className="h-20 leading-relaxed resize-none"
                placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
              />
            </div>

            <Button type="submit" className="w-full">
              Carregar vídeo
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <Separator />

          <form className="space-y-6">

            <div className="space-y-2">
              <Label htmlFor="">Prompt</Label>

              <Select>
                <SelectTrigger >
                  <SelectValue placeholder='Selecione um prompt...' />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="title">Título do Youtube</SelectItem>
                  <SelectItem value="description">Descrição do Youtube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="">Modelo</Label>


              <Select defaultValue='gpt-3.5' disabled>
                <SelectTrigger >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="gpt-3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">Você poderá customizar essa opção em breve.</span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label htmlFor="">Temperatura</Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
              />

              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}