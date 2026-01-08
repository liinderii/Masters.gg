import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { mockProfileAbout } from "../../data/profileAbout";

export const ProfileAbout = () => {
  const data = mockProfileAbout;

  return (
    <>
      <div className="space-y-6">
        {data.sections.map((section, index) => (
          <Card
            key={index}
            className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none"
          >
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {section.content && (
                <ul className="list-disc pl-5">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
