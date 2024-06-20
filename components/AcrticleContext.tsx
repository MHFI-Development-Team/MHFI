import { Article } from '@/constants/types';
import axios from 'axios';
import { SplashScreen } from 'expo-router';
import { createContext, useEffect, useState } from 'react';

export type ArticleContextType = {
  articles: Article[];
  saveArticle: (article: Article) => void;
  //   updateArticle: (id: number) => void;
};

const ArticleContext = createContext<ArticleContextType | null>(null);

const UPLOAD_THING_SECRET = process.env.EXPO_PUBLIC_UPLOADTHING_SECRET;

const ArticleProvider = ({ children }) => {
  useEffect(() => {
    const fetchFile = async (key: string) => {
      const url = `https://utfs.io/f/${key}`;

      axios({
        method: 'post',
        url,
      })
        .then(response => {
          const seperateContent = (content: string) => {
            const title_regex = /^# .*/;
            const tag_regex = /\[tag: ([^\]]+)\]/g;
            const image_regex = /<img[^>]+src="([^"]+)"/g;

            const titles = content.match(title_regex);
            const title: string = titles ? titles[0].replace('# ', '') : 'No title found';

            const tags = content.match(tag_regex);

            const images = content.match(image_regex);
            const extractedSources = images?.map(url => {
              const extractedURL = url.match(/src="([^"]+)"/);
              return extractedURL ? extractedURL[1] : 'https://example.com/default-image.jpg';
            });

            const extractedTags = tags
              ?.map(tag => {
                const match = tag.match(/\[tag: ([^\]]+)\]/);

                if (match && match[1]) {
                  globalTags.set(match[1], true);
                }

                return match ? match[1] : null;
              })
              .filter(Boolean) as string[];

            return [title, extractedTags, extractedSources];
          };

          const [title, tags, sources] = seperateContent(response.data);

          // @ts-ignore
          const article: Article = {
            title,
            tags,
            thumbnail: sources && sources[0] ? sources[0] : null,
            content: response.data,
            id: key.replace('.mdx', ''),
          };

          //   console.log(article);

          saveArticle(article);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const fetchFiles = async () => {
      const config = {
        method: 'post',
        url: 'https://uploadthing.com/api/listFiles',
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
          'content-type': 'application/json',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
          'x-uploadthing-api-key': UPLOAD_THING_SECRET,
          'x-uploadthing-version': '6.4.0',
        },
        data: {},
      };

      axios(config)
        .then(response => {
          response.data.files.forEach((file: { key: string }) => {
            fetchFile(file.key);
          });
        })
        .catch(error => {
          console.error(error);
        });
    };

    const prepare = async () => {
      try {
        await fetchFiles();
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  const [globalTags, setGlobalTags] = useState(new Map<string, boolean>());

  const [articles, setArticles] = useState<Article[]>([]);

  const saveArticle = (article: Article) => {
    setArticles(articles => [...articles, article]);
  };

  return (
    <ArticleContext.Provider value={{ articles, saveArticle }}>{children}</ArticleContext.Provider>
  );
};

export { ArticleProvider, ArticleContext };
