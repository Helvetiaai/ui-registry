import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface Feature {
  title: string
  description: string
  icon?: React.ReactNode
}

export interface FeatureSectionProps {
  title?: string
  description?: string
  features?: Feature[]
  className?: string
}

export function FeatureSection({
  title = "Features",
  description = "Everything you need to get started.",
  features = [
    {
      title: "Feature 1",
      description: "Description of feature 1",
    },
    {
      title: "Feature 2",
      description: "Description of feature 2",
    },
    {
      title: "Feature 3",
      description: "Description of feature 3",
    },
  ],
  className,
}: FeatureSectionProps) {
  return (
    <section data-slot="feature-section" className={className}>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="mt-2 text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              {feature.icon && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
              )}
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </section>
  )
}
